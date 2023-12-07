/** @format */

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase.js";

const User = () => {
  const [data, setData] = useState([]);
  const users = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setData((prev) => [...prev, doc.data()]);
    });
  };
  useEffect(() => {
    users();
  }, []);
  const userData = data;
  console.log({ userData });
  return (
    <div>
      <button>
        {" "}
        <a href="/main">Add User</a>
      </button>
      <div>
        {}

        <form>
          {data.map(({ first, last }) => {
            return (
              <div style={{ width: "100vh" }}>
                <label>First Name</label>
                <input type="text" disabled value={first} />
                <label style={{ marginLeft: "1rem" }}>Last Name</label>
                <input type="text" disabled value={last} />
                <br />
                <br />
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default User;
