/** @format */

import React from "react";
import { Container } from "react-bootstrap";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Employees from "./components/Employees.js";
import Login from "./components/Login.js";
import Employee from "./components/Employee.js";
import Signup from "./components/Signup.js";
import { AuthProvider } from "./context/AuthContext.js";
import AppContainer from "./components/ui/AppContainer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  // const navigate = useNavigate(); // Unused, can be removed

  return (
    <Router>
      <AuthProvider>
        {/* AppContainer wraps the entire application providing layout styling */}
        <AppContainer>
          {/* Define routes using the Routes component */}
          <Routes>
            {/* Default route redirects to /employees */}
            {/* <Route path="/" element={<Navigate to="/employees" />} /> */}

            {/* Route for the signup page */}
            <Route path="/signup" element={<Signup />} />

            {/* Route for the login page */}
            <Route path="/login" element={<Login />} />

            {/* PrivateRoute for the Employees page, accessible only when authenticated */}
            <Route
              path="/employees"
              element={<PrivateRoute element={<Employees />} />}
            />

            {/* PrivateRoute for the Add Employee page, accessible only when authenticated */}
            <Route
              path="/add-employee"
              element={<PrivateRoute element={<Employee />} />}
            />

            {/* Default fallback route redirects to /employees */}
            <Route path="*" element={<Navigate to="/employees" replace />} />
          </Routes>
        </AppContainer>
      </AuthProvider>
    </Router>
  );
}

export default App;
