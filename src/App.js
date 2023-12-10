import React from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Employees from "./components/Employees.js";
import Login from "./components/Login.js";
import Employee from "./components/Employee.js";
import Signup from "./components/Signup.js";
import { AuthProvider } from "./context/AuthContext.js";

function App() {
  // const navigate = useNavigate();

  // Define an array of routes where you want to apply the specific Container CSS
  const routesWithSpecificContainer = ["/login", "/signup"];

  // Check if the current route is in the array
  const isLogin = routesWithSpecificContainer.includes(window.location.pathname);

  return (
    <Router>
      <AuthProvider>
        <Container
        fluid
          className={` ${
            isLogin ? "d-flex align-items-center justify-content-center" : "w-100"
          }`}
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: isLogin?"400px":'' }}>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/add-employee" element={<Employee />} />
            </Routes>
          </div>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
