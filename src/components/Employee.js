/** @format */

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
// import { object, string, date } from 'zod';
import * as z from "zod";

import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Button, Dropdown, Form, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import db from "../firebase";
import { convertTimestampToDate, formatDate } from "../utils/date";

const fieldConfig = [
  { label: "First Name", type: "text", id: "first" },
  { label: "Last Name", type: "text", id: "last" },
  { label: "Date of Birth", type: "date", id: "dateOfBirth" },
  { label: "Email", type: "email", id: "email" },
  { label: "Department", type: "select", id: "department" },
  { label: "Job Title", type: "text", id: "jobTitle" },
  { label: "Hire Date", type: "date", id: "hireDate" },
];

const dropdownOptions = {
  department: ["Frontend", "Backend", "Product Lead", "Team Lead", "Manager"],
};

const schema = z.object({
  first: z.string(),
  last: z.string(),
  dateOfBirth: z.date(),
  email: z.string().email(),
  department: z.string(),
  jobTitle: z.string(),
  hireDate: z.date(),
});

const Employee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { control, handleSubmit, setValue, formState } = useForm({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;
  const { isSubmitting } = formState;
  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const employeeId = searchParams.get("employeeId");

      if (employeeId) {
        try {
          const employeeDoc = await getDoc(doc(db, "users", employeeId));
          const data = employeeDoc.data();
          if (employeeDoc.exists()) {
            // Set form values using setValue
            Object.keys(data).forEach((key) => {
              if (key.toLocaleLowerCase().includes("date"))
                setValue(key, convertTimestampToDate(data[key]));
              else setValue(key, data[key]);
            });
          }
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      }
    };

    fetchData();
  }, [location.search, setValue]);

  const handleChange = (selectedValue, field) => {
    setValue(field, selectedValue);
  };

  const addOrUpdateEmployee = async (data) => {
    try {
      const employeeData = {
        first: data.first,
        last: data.last,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        department: data.department,
        jobTitle: data.jobTitle,
        hireDate: data.hireDate,
      };

      if (isSubmitting) return;

      if (location.search.includes("employeeId")) {
        const searchParams = new URLSearchParams(location.search);
        const employeeId = searchParams.get("employeeId");
        await setDoc(doc(db, "users", employeeId), employeeData);
      } else {
        const docRef = await addDoc(collection(db, "users"), employeeData);
        console.log("Document written with ID: ", docRef.id);
      }

      navigate("/employees");
    } catch (error) {
      console.error("Error adding/updating document: ", error);

      // Handle error and set error messages using setError
      // setError('field', { type: 'manual', message: 'Error message' });
    } finally {
      // Set loading to false
      // setLoading(false);
    }
  };
  return (
    <Form onSubmit={handleSubmit(addOrUpdateEmployee)} className="p-4">
      {fieldConfig.map((item) => (
        <Form.Group key={item.id} className="mb-3" controlId={`form${item.id}`}>
          <Form.Label>{item.label}</Form.Label>

          <Controller
            control={control}
            name={item.id}
            render={({ field }) => {
              const isDate = field.name.toLocaleLowerCase().includes("date");
              return item.type === "select" ? (
                <Dropdown
                  onSelect={(selectedValue) =>
                    handleChange(selectedValue, field.name)
                  }
                >
                  <Dropdown.Toggle
                    variant="secondary"
                    className="w-100 d-flex align-items-center justify-content-between"
                  >
                    {field.value || `Select ${item.label}`}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    {dropdownOptions[field.name]?.map((option) => (
                      <Dropdown.Item key={option} eventKey={option}>
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Form.Control
                  type={item.type}
                  {...field}
                  value={
                    isDate ? formatDate(field.value, "yyyy-MM-dd") : field.value
                  }
                  // {...register(field.id)}
                  onChange={(e) => {
                    const value = isDate
                      ? new Date(e.target.value)
                      : e.target.value;
                    handleChange(value, field.name);
                  }}
                />
              );
            }}
          />
          {errors[item.id] && (
            <Form.Text className="text-danger">
              {errors[item.id].message}
            </Form.Text>
          )}
        </Form.Group>
      ))}

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="ms-2">
              {location.search.includes("employeeId")
                ? "Updating Employee..."
                : "Adding User..."}
            </span>
          </>
        ) : location.search.includes("employeeId") ? (
          "Update Employee"
        ) : (
          "Add Employee"
        )}
      </Button>
    </Form>
  );
};

export default Employee;
