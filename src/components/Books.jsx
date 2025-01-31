/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
// players
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]); // Books displayed in UI
  const [showAvailableOnly, setShowAvailableOnly] = useState(false); // Controls filter

  useEffect(() => {
    async function getData() {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
        setIsLoading(false);

        // Initially show all books
        setFilteredBooks(booksData);
      } catch (err) {
        console.error("Error fetching books:", err); // 
        setError("Failed to load books. Please try again later.");
        setIsLoading(false);
      }
    }

    getData();
  }, []); 

  if (isLoading) {
    return <h2>Loading books...</h2>;
  }

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
      setFilteredBooks(books); // Show all books
    } else {
      setFilteredBooks(books.filter((book) => book.available)); // Show only available books
    }
    setShowAvailableOnly(!showAvailableOnly);
  }

  return (
    <div>
      {/* Toggle Filter Button */}
      <button onClick={toggleFilter}>
        {showAvailableOnly ? "Show All Books" : "Show Available Books"}
      </button>
      <h2>All Books</h2>
      <div className="grid-container">

         {/* Book List */}
      {filteredBooks.length > 0 ? (
        <ul>
          {filteredBooks.map((book) => (
      
          <li className="grid-item" key={book.id}>
            <h3>{book.title}</h3>
            <h4>Author: {book.author}</h4>
            {book.available ? <h3 style={{color: "blue"}} >Available</h3> : <h3 style={{color: "red"}}>Not Available</h3>}
            <img src={book.coverimage} alt={book.title} />

            <br />

            <Link
              to={`/book/${book.id}`}
              onClick={() => console.log(`Navigating to book ID: ${book.id}`)}
            >
              More Details
            </Link>
          </li>
        ))}
        </ul>
      ) : (
        <p>No books available.</p>
      )}
      </div>
    </div>
  );
};

export default Books;
