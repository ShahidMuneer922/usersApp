/** @format */

import React, { useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink } from "react-router-dom";

// Signup component for user registration
const Signup = () => {
  // Get the authentication instance
  const auth = getAuth();

  // State variables to manage form inputs, error/success messages, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Password does not match");
      setIsLoading(false);
      return;
    }

    try {
      // Attempt to create a new user with provided email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      setSuccess("User added successfully");
    } catch (err) {
      // Handle errors during user creation
      setError(err.message);
      console.error(err.message);
    } finally {
      // Set loading state to false after form submission is complete
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card.Body style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">SIGN UP</h2>

        {/* User registration form */}
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {/* Email input */}
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {/* Password input */}
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Confirm Password input */}
          <Form.Group id="password-confirmation">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Submit button with loading spinner */}
          <Button className="w-100" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
          </Button>

          {/* Link to login page */}
          <div className="w-100 text-center mt-2">
            Already Have An Account? <NavLink to="/login">Log In</NavLink>
          </div>

          {/* Display error message if there is an error */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Display success message if user registration is successful */}
          {success && <Alert variant="success">{success}</Alert>}
        </Form>
      </Card.Body>
    </>
  );
};

// Export the Signup component
export default Signup;
