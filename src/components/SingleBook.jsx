/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleBook, reserveBook } from "../api";

const SingleBook = ({token}) => {
  const { id } = useParams(); // Get the book ID from the route;
  console.log("Book ID from params:", id); // Add this to check the value of `id`
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  
  

  useEffect(() => {
    async function getData() {
      console.log("Fetching book with ID:", id); // Log the ID before the API call
  
      try {
        const bookData = await getSingleBook(id);
        console.log("Fetched book data:", bookData); // Log the fetched book data
        setBook(bookData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setError("Failed to load book data.");
        setIsLoading(false);
      }
    }
  
    getData();
  }, [id]);

  async function handleReserve(bookId) {
    if (!token) {
      setError("You must be logged in to reserve a book.");
      return;
    }

    setError(null);
    setSuccess(null);

    const result = await reserveBook(token, bookId);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("Book reserved successfully!");
    }
  }
  

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

  if (!book) {
    return (
      <div>
        <h2>Book not found.</h2>
        <Link to="/">Back to All Books</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{book.title || "Unknown Title"}</h1>
      <h3>{book.author || "Unknown Author"}</h3>
      {book.available ? <h3 style={{color: "blue"}} >Available</h3> : <h3 style={{color: "red"}}>Not Available</h3>}
      <img
        src={book.coverimage || "https://via.placeholder.com/200"}
        alt={book.title || "Unknown"}
      />
      <p>{book.description || "Unknown Description"}</p>


      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button onClick={() => handleReserve(book.id)}>Reserve</button>
      <Link to="/">Back to All Books</Link>
    </div>
  );
};

export default SingleBook;
