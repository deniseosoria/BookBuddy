/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import React, { useState, useEffect } from "react";
import { getAuthentication, getReservedBooks } from "../api";

const Account = ({ token }) => {

  const [user, setUser] = useState(null);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("Please log in to view your account.");
      return;
    }

    async function fetchUserData() {
      try {
        const userData = await getAuthentication(token);
        setUser(userData);

        // Fetch reserved books

        const reservedData = await getReservedBooks(token)
        setReservedBooks(reservedData);
      } catch (err) {
        setError("Error fetching account details.");
      }
    }
    fetchUserData();

  }, [token]);

  if (!token) {
    return <p>Please log in or create an account.</p>;
  }

  

  if (!user) {
    return <p>Loading account details...</p>;
  }

  if (reservedBooks.length === 0) {
    return <h2>No books found.</h2>;
  }

  return (
    <div>
      <h2>Welcome, {user.firstname || "User"}!</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>User ID: {user.id || "Uknown ID"}</h3>
      <h3>First Name: {user.firstname || "Unknown First Name"}</h3>
      <h3>Last Name: {user.lastname || "Unknown Last Name"}</h3>
      <h3>Email: {user.email || "Unknown Email"}</h3>
      <h3>Your Reserved Books:</h3>
      {reservedBooks.length > 0 ? (
        <ul>
          {reservedBooks.map((book) => (
            <li key={book.id}>
              <h4>{book.title} by {book.author}</h4>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not reserved any books yet.</p>
      )}
    </div>
  );
};

export default Account;
