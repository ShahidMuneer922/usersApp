/** @format */

import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// PrivateRoute component ensures that a route is only accessible when the user is authenticated.
const PrivateRoute = ({ element, path }) => {
  // Get the authentication instance
  const auth = getAuth();

  // State to keep track of the user's authentication status and loading state
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Effect to listen for changes in authentication state
  React.useEffect(() => {
    // Set up an event listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the user state when the authentication state changes
      setUser(user);
      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  // If still loading, render nothing to avoid flashing content
  if (loading) {
    return <></>;
  }

  // If the user is authenticated, render the protected element
  // Otherwise, redirect to the login page with the original requested path
  return user ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: path }} replace />
  );
};

// Export the PrivateRoute component
export default PrivateRoute;
