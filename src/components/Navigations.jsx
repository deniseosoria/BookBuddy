/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuthentication } from "../api"; // Import the API function

const Navigations = () => {
  const [user, setUser] = useState(null);
  const location = useLocation(); // Get current route

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAuthentication(token).then((data) => {
        if (!data.error) {
          setUser(data); // Set authenticated user data
        }
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    sessionStorage.removeItem("token"); // In case it's stored here too
    setUser(null); // Clear user state
    window.location.href = "/"; // Redirect to homepage
  };

  return (
    <div className="nav">
      {/* Show "Home" link ONLY if the user is NOT on "/" */}
      {location.pathname !== "/" && (
        <Link to="/" className="nav-link">Home</Link>
      )}

      {!user ? (
        <Link to="/users/login" className="nav-link">
          Login
        </Link>
      ) : (
        <>
          <Link to="/users/account" className="nav-link">
            Account
          </Link>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Navigations;
