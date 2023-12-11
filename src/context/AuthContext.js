/** @format */

import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import {
  //   createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    // return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  // Render children only when currentUser is defined
  return (
    <AuthContext.Provider value={value}>
      {currentUser !== undefined && children}
    </AuthContext.Provider>
  );
}
