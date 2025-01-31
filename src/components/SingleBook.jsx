/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleBook, reserveBook } from "../api";

const SingleBook = ({ token }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const bookData = await getSingleBook(id);
        setBook(bookData);

      } catch (err) {
        setError(err.message || "Failed to load book data.");

      } finally {
        setIsLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  async function handleReserve() {

    try {
      const result = await reserveBook(token, book.id);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Book reserved successfully!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  if (isLoading) return <h2>Loading book details...</h2>;

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/">Back to All Books</Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div>
        <h2>Book not found.</h2>
        <Link to="/">Back to All Books</Link>
      </div>
    );
  }

  return (
    <div className="single-book">
      <h1>{book.title || "Unknown Title"}</h1>
      <h3>{book.author || "Unknown Author"}</h3>
      <h3 style={{ color: book.available ? "blue" : "red" }}>
        {book.available ? "Available" : "Not Available"}
      </h3>
      <img
        src={book.coverimage || "https://via.placeholder.com/200"}
        alt={book.title || "Book Cover"}
        style={{ maxWidth: "200px", height: "auto" }}
      />
      <p>{book.description || "No description available."}</p>

      {/* Success/Error Messages */}
      {error && <p style={{ color: "red" }} aria-live="polite">{error}</p>}
      {success && <p style={{ color: "green" }} aria-live="polite">{success}</p>}

      {/* Conditionally render the Reserve button */}
      {token && book.available && (
        <button onClick={handleReserve}>Reserve</button>
      )}

      <br/>
      <Link to="/"><button>Back to All Books</button></Link>
    </div>
  );
};

export default SingleBook;
