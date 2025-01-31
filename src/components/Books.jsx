/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
// players
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const booksData = await getBooks();
        if (!booksData || booksData.length === 0) {
          throw new Error("No books found.");
        }
        setBooks(booksData);
        setFilteredBooks(booksData);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message || "Failed to load books. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  if (isLoading) return <h2>Loading books...</h2>;

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return <h2>No books found.</h2>;
  }

  // Function to toggle between all books and available books
  function toggleFilter() {
    if (showAvailableOnly) {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((book) => book.available));
    }
    setShowAvailableOnly(!showAvailableOnly);
  }

  return (
    <div className="books">
      {/* Toggle Filter Button */}
      <button className="available-button" onClick={toggleFilter}>
        {showAvailableOnly ? "Show All Books" : "Show Available Books"}
      </button>

      <h2>Library Catalog</h2>
      <div className="grid-container">
        {/* Book List */}
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="grid-item" key={book.id}>
              <h3>{book.title || "Unknown Title"}</h3>
              <h4>Author: {book.author || "Unknown Author"}</h4>
              <h3 style={{ color: book.available ? "blue" : "red" }}>
                {book.available ? "Available" : "Not Available"}
              </h3>

              <img
                src={book.coverimage || "https://via.placeholder.com/200"}
                alt={book.title || "Book Cover"}
                style={{ maxWidth: "150px", height: "auto" }}
              />

              <br />
              <Link
                to={`/book/${book.id}`}
                onClick={() => console.log(`Navigating to book ID: ${book.id}`)}
              >
                More Details
              </Link>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default Books;
