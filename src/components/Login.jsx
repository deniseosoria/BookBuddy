/* TODO - add your code to create a functional React component that renders a login form */

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getLogin } from "../api";
import userIcon from "../assets/icons/icons8-person-48.png";
import passwordIcon from "../assets/icons/icons8-lock-30.png";
import signupImg from "../assets/icons/sign-up.png";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [token, setLocalToken] = useState(null); // Store the token locally
  const navigate = useNavigate(); // Hook to navigate programmatically

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null); // Clear previous errors

    try {
      const loginData = await getLogin(formData);

      if (loginData?.error) {
        throw new Error(loginData.error);
      }

      if (loginData.token) {
        setToken(loginData.token); // Update App.js state
        setLocalToken(loginData.token); // Store locally for the Link button
        localStorage.setItem("token", loginData.token); // Persist login
        //navigate("/users/account"); // Auto-redirect to Account page
        window.location.href = "/"; // Redirect to homepage
      } else {
        throw new Error("Account not found. Please register.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message);
    }
  }

  return (
    <div className="sign-up-container">
      <div >
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-with-icon">
              <label>
                <img src={userIcon} alt="User Icon" className="input-icon" />
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  required
                />
              </label>
            </div>
          </div>

          <div className="input-container">
            <div className="input-with-icon">
              <label>
                <img
                  src={passwordIcon}
                  alt="Lock Icon"
                  className="password-icon"
                />
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  required
                  minLength="4"
                  maxLength="8"
                />
              </label>
            </div>
          </div>
          
          <button className="form-button" type="submit">
            Login
          </button>
        </form>

        {error && error.includes("Username or password is incorrect")}

        <p>
          Dont have an accout?{" "}
          <Link to="/users/register">
            <button>Sign-up</button>
          </Link>
        </p>
      </div>
      <div className="form-img-container">
        <img className="form-img" src={signupImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
