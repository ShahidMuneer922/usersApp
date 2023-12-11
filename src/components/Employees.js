/** @format */

import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../firebase.js";
import { Button, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { convertTimestampToDate, formatDate } from "../utils/date.js";
import { getAuth, signOut } from "firebase/auth";

// Function to fetch users from Firestore
const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const userData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userData;
};

// Separate EmployeeRow component for each row in the table
const EmployeeRow = ({ employee, fetchUsers }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle the deletion of an employee
  const handleDelete = async (employeeId) => {
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, "users", employeeId));
      // Refresh data after deletion
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      // Redirect to the login page after successful logout
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <tr>
      <td>{employee.id}</td>
      <td>{`${employee.first} ${employee.last}`}</td>
      <td>
        {formatDate(convertTimestampToDate(employee.dateOfBirth), "MM-dd-yyyy")}
      </td>
      <td>{employee.email}</td>
      <td>{employee.department}</td>
      <td>{employee.jobTitle}</td>
      <td>
        {formatDate(convertTimestampToDate(employee.hireDate), "MM-dd-yyyy")}
      </td>
      <td>
        {/* Button to navigate to the Edit page */}
        <Button
          variant="primary"
          onClick={() => navigate(`/add-employee?employeeId=${employee.id}`)}
        >
          Edit
        </Button>{" "}
        {/* Button to handle employee deletion */}
        <Button
          variant="danger"
          onClick={() => handleDelete(employee.id)}
          disabled={isDeleting}
          style={{ minWidth: "73px" }}
        >
          {isDeleting ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Delete"
          )}
        </Button>
      </td>
    </tr>
  );
};

// Main Employees component
const Employees = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handle edit action (currently just logging to console)
  const handleEdit = (employeeId) => {
    console.log(`Edit clicked for employee with ID: ${employeeId}`);
  };

  // Function to fetch users and update state
  const fetchUsers = async () => {
    try {
      const userData = await getUsers();
      setData(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      // Redirect to the login page after successful logout
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="vh-100 p-4 ">
      <div className="d-flex justify-content-between mb-4">
        <h3>Employees</h3>
        {/* Button to navigate to Add New Employee page */}
        <Button onClick={() => navigate("/add-employee")}>
          Add New Employee
        </Button>
        {/* Logout Button */}
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div>
        {loading ? (
          // Display a loading spinner while data is being fetched
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          // Display the table once data is loaded
          <Table striped bordered>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Department</th>
                <th>Job Title</th>
                <th>Hire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render EmployeeRow for each employee in the data */}
              {data.map((employee) => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                  onEdit={handleEdit}
                  fetchUsers={fetchUsers}
                  loading={loading}
                />
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Employees;
