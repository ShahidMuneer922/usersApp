/** @format */

import React, { useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

// Login component for user authentication
const Login = () => {
  // Get the authentication instance
  const auth = getAuth();

  // UseNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // State variables to manage form inputs, error message, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission for user login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Attempt to sign in with the provided email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // If the sign-in is successful, navigate to the '/employees' page
      if (userCredential) {
        setIsLoading(false);
        // Redirect to '/employees' upon successful login
        navigate("/employees");
      }
    } catch (err) {
      // Handle errors during login
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card.Body style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">LOGIN</h2>

        {/* User login form */}
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {/* Email input */}
          <Form.Group id="email">
            <Form.Label>User Email</Form.Label>
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

          {/* Submit button with loading spinner */}
          <Button className="w-100" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>

          {/* Link to signup page */}
          <div className="w-100 text-center mt-2">
            Don't Have An Account? <NavLink to={"/signup"}>Sign Up</NavLink>
          </div>

          {/* Display error message if there is an error */}
          {error && <Alert variant="danger">{error}</Alert>}
        </Form>
      </Card.Body>
    </>
  );
};

// Export the Login component
export default Login;
