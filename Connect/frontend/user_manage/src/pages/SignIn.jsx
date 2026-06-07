import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./signin.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(null);
  const [isProfessionalEnabled, setIsProfessionalEnabled] = useState(false);
  const [isContEnabled, setIsContEnabled] = useState(false);
  const [highlightedButton, setHighlightedButton] = useState("signin");

  useEffect(() => {
    if (isProfessionalEnabled) {
      setHighlightedButton("professional");
    } else if (isContEnabled) {
      setHighlightedButton("continue");
    }
  }, [isProfessionalEnabled, isContEnabled]);

  const handleSignIn = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${username}`,
        {
          params: { username, password },
        }
      );
      const { success, data } = response.data;

      if (success) {
        // Compare entered password with retrieved password
        if (data.user_password === password) {
          Cookies.set("user_id", data.user_id, { path: "/", sameSite: "Strict" });
          Cookies.set("user_type_id", data.user_type_id, {
            path: "/",
            sameSite: "Strict",
          });

        setUserType(data.user_type_id);

        if (data.user_type_id === 1) {
          setIsProfessionalEnabled(true);
        } else if (data.user_type_id === 2) {
          setIsContEnabled(true);
        }
      } else {
        alert("Invalid username or password");
      }
    }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleForgotPassword = () => {
    alert("Please contact the admin (no:9876543210) to reset your password.");
  };

  const handleContClick = () => {
    window.location.href = "/chooseInterest.html";
  };

  const handleProfessionalClick = () => {
    window.location.href = "/professional";
  };

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={`signin-btn ${
          highlightedButton === "signin" ? "highlight" : ""
        }`}
        onClick={handleSignIn}
      >
        Sign In
      </button>
      <button
        className={`continue-btn ${
          highlightedButton === "continue" ? "highlight" : ""
        }`}
        disabled={!isContEnabled}
        onClick={handleContClick}
      >
        Continue
      </button>
      <button
        className={`professional-btn ${
          highlightedButton === "professional" ? "highlight" : ""
        }`}
        disabled={!isProfessionalEnabled}
        onClick={handleProfessionalClick}
      >
        Professional
      </button>

      <p>
        <span style={{ color: "gray" }}>Forgot your password? </span>
        <a
          href="#"
          onClick={handleForgotPassword}
          style={{
            textDecoration: "underline",
            color: "#007BFF",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Click here
        </a>
      </p>
    </div>
  );
};

export default SignIn;
