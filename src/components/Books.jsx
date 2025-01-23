/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
// players
import React from 'react'
import { Link } from "react-router-dom";

const Books = ({books}) => {
    // if (books.length === 0) {
    //     return <h2>No books found.</h2>;
    //   }

    
      return (
        <div>
          <h2>All Books</h2>
          <div className="grid-container">
            {books.map((book) => (
              <div className="grid-item" key={book.id}>
                <h3>{book.title}</h3>
                <h4>Author: {book.author}</h4>
                <img src={book.coverimage} alt={book.title} />

                <br />
    
                <Link to={`/book/${book.id}`}>More Details</Link>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Books