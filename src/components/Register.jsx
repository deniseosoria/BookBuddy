import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getRegister } from "../api";
import userIcon from "../assets/icons/icons8-person-48.png";
import passwordIcon from "../assets/icons/icons8-lock-30.png";
import signupImg from "../assets/icons/sign-up.png";

const Register = ({ setToken }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [token, setLocalToken] = useState(null); // Store the token locally
  const navigate = useNavigate(); // Hook to navigate programmatically

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null); // Clear previous errors

    try {
      const registerData = await getRegister(formData);

      if (registerData?.error) {
        throw new Error(registerData.error);
      }

      if (registerData.token) {
        setToken(registerData.token); // Update App.js state
        setLocalToken(registerData.token); // Store locally for the Link button
        localStorage.setItem("token", registerData.token); // Persist login
        navigate("/users/account"); // Auto-redirect to Account page
        window.location.reload(); // Refresh page to update navigation
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message);
    }
  }

  return (
    <div className="sign-up-container">
      <div>
        <h2>Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-with-icon">
              <label>
                <img src={userIcon} alt="User Icon" className="input-icon" />
                <input
                  type="text"
                  value={formData.firstname}
                  placeholder="First Name"
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      firstname: e.target.value,
                    }));
                  }}
                />
              </label>
            </div>
          </div>

          <div className="input-container">
            <div className="input-with-icon">
              <label>
                <img src={userIcon} alt="User Icon" className="input-icon" />
                <input
                  type="text"
                  value={formData.lastname}
                  placeholder="Last Name"
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      lastname: e.target.value,
                    }));
                  }}
                />
              </label>
            </div>
          </div>

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
            Register
          </button>
        </form>

        {/* Show login link if email already exists */}
        {error && error.includes("Account already exists") && (
          <p>
            Already have an account?{" "}
            <Link to="/users/login">
              <button>Log in here</button>
            </Link>
          </p>
        )}

        {/* Show link button only if registration is successful */}
        {token && (
          <Link to="/users/account">
            <button>Go to My Account</button>
          </Link>
        )}
      </div>
      <div className="form-img-container">
        <img className="form-img" src={signupImg} alt="" />
      </div>
    </div>
  );
};

export default Register;
