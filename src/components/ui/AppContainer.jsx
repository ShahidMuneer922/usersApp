/** @format */

import React from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

// AppContainer component defines the layout container for different routes
const AppContainer = ({ children }) => {
  // Get the current location using the useLocation hook from React Router
  const location = useLocation();
  const pathname = location.pathname;

  // Define an array of routes where you want to apply the specific Container CSS
  const routesWithSpecificContainer = ["/login", "/signup"];

  // Check if the current route is in the array of routes requiring a specific container style
  const isLogin = routesWithSpecificContainer.includes(pathname);

  // Return the Container component with dynamic classes based on the route
  return (
    <Container
      fluid
      // Apply different classes based on the condition (isLogin)
      className={`${
        isLogin ? "d-flex align-items-center justify-content-center" : "w-100"
      }`}
      // Set a minimum height for the container to fill the viewport
      style={{ minHeight: "100vh" }}
    >
      {children} {/* Render the children components within the Container */}
    </Container>
  );
};

export default AppContainer;
