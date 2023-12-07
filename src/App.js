/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/AuthContext.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import "./App.css";
import User from "./components/User.js";
import Main from "./components/Main.js";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<User />} />
              <Route path="/main" element={<Main />} />
            </Routes>
          </div>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
