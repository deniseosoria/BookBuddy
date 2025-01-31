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
  const [token, setToken] = useState(() => localStorage.getItem("token"));

   // Function to handle setting & persisting the token
   const handleSetToken = (newToken) => {
    if (newToken) {
      setToken(newToken);
      localStorage.setItem("token", newToken); // Store token in localStorage
    } else {
      setToken(null);
      localStorage.removeItem("token"); // Remove token on logout
    }
  };

  return (
    <>
      <header>
        <h1>
          <img id="logo-image" src={bookLogo} alt="Library Logo" />
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
          <Route path="/book/:id" element={<SingleBook token={token}/>} />
          <Route path="/users/login" element={<Login setToken={handleSetToken} token={token} />} />
          <Route path="/users/register" element={<Register setToken={handleSetToken} token={token} />} />
          <Route path="/users/account" element={token ? <Account token={token} /> : <p>Please register or log in.</p>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
