/** @format */

import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <>
      <Card.Body>
        <h2 className="text-center mb-4"> LOGIN</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>User Email</Form.Label>
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

          <Button className="w-100" type="submit">
            {success ? (
              <a href="/user" style={{ color: "white" }}>
                LOGIN
              </a>
            ) : (
              <a href="/login" style={{ color: "white" }}>
                LOGIN
              </a>
            )}
          </Button>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        Don't Have An Account? <a href="/">Sign Up</a>
      </div>
    </>
  );
};
export default Login;
