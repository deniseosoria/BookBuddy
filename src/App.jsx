import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import bookLogo from "./assets/books.png";
import SearchBar from "./components/SearchBar";
import SearchedBooks from "./components/SearchedBooks";
import Navigation from "./components/Navigations";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";

function App() {
  const [token, setToken] = useState(null);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books`;

  async function fetchAllBooks() {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      console.log(result)

      setBooks(result.books);

      

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books. Please try again later.");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllBooks();
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

  return (
    <>
      <header>
        <h1>
          <img id="logo-image" src={bookLogo} />
          Library App
        </h1>
        <nav>
          <Navigation />
        </nav>
      </header>

      <div>
        <Routes>
          {/* Home Route: Search Bar and All Books */}
          <Route
            path="/"
            element={
              <>
                <SearchBar />

                <Books books={books} />
              </>
            }
          />

          {/* Searched Book Route */}
          <Route path="/book/:name" element={<SearchedBooks />} />

          {/* Single Book Route */}
          <Route path="/book/:id" element={<SingleBook />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Account Route */}
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
