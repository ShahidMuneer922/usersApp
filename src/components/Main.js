/** @format */

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";

const Main = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const data2 = async (e) => {
    e.preventDefault();
    try {
      console.log(firstName);

      const docRef = await addDoc(collection(db, "users"), {
        first: firstName,
        last: lastName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <form onSubmit={data2}>
        <ul>
          <label>First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <label>Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </ul>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default Main;
