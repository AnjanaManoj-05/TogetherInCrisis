import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 
import './signup.css'
const SignUp = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    dateofbirth: "",
    email: "",
    contact_no: "",
    user_password: "",
    confirmPassword: "",
    user_type_id: 2, // Assuming 2 as a default user type
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when the user starts typing
    if (name === "email" || name === "user_password" || name === "confirmPassword") {
      setError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 15;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email and password
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(formData.user_password)) {
      setError("Password must be between 8 and 15 characters.");
      return;
    }

    if (formData.user_password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const payload = {
      user_name: formData.user_name,
      dateofbirth: formData.dateofbirth,
      email: formData.email,
      contact_no: formData.contact_no,
      user_password: formData.user_password,
      user_type_id: formData.user_type_id,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const userId = data.data.user_id; // Assuming the server returns user_id in the response
          Cookies.set('user_id', userId, { sameSite: 'Strict' });
          console.log("User ID from cookies: ", Cookies.get('user_id'));
          alert(`Account created successfully! Your user ID is: ${userId}`);
          navigate("/chooseInterest.html"); // Update path to match your routing
        } else {
          alert(data.message || "Error creating account!");
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error creating account!");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="user_name"
          required
          value={formData.user_name}
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          name="dateofbirth"
          required
          value={formData.dateofbirth}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        {error && error.includes("email") && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Contact Number"
          name="contact_no"
          required
          value={formData.contact_no}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Create new password"
          name="user_password"
          required
          value={formData.user_password}
          onChange={handleChange}
        />
        {error && error.includes("Password") && <div className="error">{error}</div>}
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {error && error.includes("match") && <div className="error">{error}</div>}
        <button type="submit">Create account</button>
      </form>
    </div>
  );
};

export default SignUp;
