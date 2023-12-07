/** @format */

import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Hello = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      return setError("Password does not match");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      setSuccess("User Added successfully");
    } catch (err) {
      setError(err.message);

      console.log(err.message);
    }
  };

  return (
    <>
      <Card.Body>
        <h2 className="text-center mb-4"> SIGN UP</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => {
                console.log(e.target.value);
                setPassword(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group id="password-confirmation">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="w-100" type="submit">
            Sign Up
          </Button>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        {" "}
        Already Have An Account? <a href="/login">Log In</a>
      </div>
    </>
  );
};
export default Hello;
