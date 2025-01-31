/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Link } from "react-router-dom";
import React from "react";

const Navigations = () => {
  return (
    <div>
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/users/login" className="nav-link">
        Login
      </Link>
      <Link to="/users/account" className="nav-link">
        Account
      </Link>
    </div>
  );
};

export default Navigations;
