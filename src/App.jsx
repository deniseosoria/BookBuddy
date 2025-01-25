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
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <Books />
              </>
            }
          />
          <Route path="/book/search/:name" element={<SearchedBooks />} />
          <Route path="/book/:id" element={<SingleBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
