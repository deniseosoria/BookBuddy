import React, { useState, useEffect } from "react";
import { getAuthentication, getReservedBooks, returnBook } from "../api";

const Account = ({ token }) => {
  const [user, setUser] = useState(null);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState("accountInfo"); // Controls which section to show

  // Handle missing token early
  if (!token) {
    return <p>Please log in or create an account.</p>;
  }

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getAuthentication(token);
        setUser(userData);

        const reservedData = await getReservedBooks(token);
        setReservedBooks(reservedData);
      } catch (err) {
        setError("Error fetching account details.");
      }
    }

    fetchUserData();
  }, [token]);

  // Handle book return
  async function handleReturn(bookId) {
    try {
      const result = await returnBook(token, bookId);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Book returned successfully!");
        setReservedBooks((prevBooks) =>
          prevBooks.filter((book) => book.id !== bookId)
        );
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  if (!user) {
    return <p>Loading account details...</p>;
  }

  return (
    <div className="account-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Account</h3>
        <button
          className={activeTab === "accountInfo" ? "active" : ""}
          onClick={() => setActiveTab("accountInfo")}
        >
          Account Info
        </button>
        <button
          className={activeTab === "reservedBooks" ? "active" : ""}
          onClick={() => setActiveTab("reservedBooks")}
        >
          Reserved Books
        </button>
      </div>

      {/* Main Content */}
      <div className="content">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        {activeTab === "accountInfo" && (
          <div className="accountInfo">
            <h2>Welcome, {user.firstname || "User"}!</h2>
            <h3>User ID: {user.id || "Unknown ID"}</h3>
            <h3>First Name: {user.firstname || "Unknown"}</h3>
            <h3>Last Name: {user.lastname || "Unknown"}</h3>
            <h3>Email: {user.email || "Unknown"}</h3>
          </div>
        )}

        {activeTab === "reservedBooks" && (
          <div className="reservedBooks">
            <h3>Your Reserved Books:</h3>
            {reservedBooks.length > 0 ? (
              <ul className="reserved-books-list">
                {reservedBooks.map((book) => (
                  <li key={book.id}>
                    <h4>
                      {book.title} by {book.author}
                    </h4>
                    <img
                      src={book.coverimage || "https://via.placeholder.com/200"}
                      alt={book.title || "Book Cover"}
                      style={{ maxWidth: "150px", height: "auto" }}
                    />
                    <div>
                      <button
                        className="return-book-button"
                        onClick={() => handleReturn(book.id)}
                      >
                        Return
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You have not reserved any books yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
