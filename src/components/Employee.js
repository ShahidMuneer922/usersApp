import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../firebase';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
const fieldConfig = [
  { label: 'First Name', type: 'text', id: 'first', required: true },
  { label: 'Last Name', type: 'text', id: 'last', required: true },
  { label: 'Date of Birth', type: 'date', id: 'dateOfBirth', required: true },
  { label: 'Email', type: 'email', id: 'email', required: true },
  {
    label: 'Department ID',
    type: 'text',
    id: 'departmentId',
    required: true
  },
  { label: 'Job Title', type: 'text', id: 'jobTitle', required: true },
  { label: 'Hire Date', type: 'date', id: 'hireDate', required: true }
];
const Employee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    dateOfBirth: '',
    email: '',
    departmentId: '',
    jobTitle: '',
    hireDate: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
console.log({location})
  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const employeeId = searchParams.get('employeeId');

      if (employeeId) {
        try {
          const employeeDoc = await getDoc(doc(db, 'users', employeeId));
          const data = employeeDoc.data();
          console.log({ data });
          if (employeeDoc.exists()) {
            setFormData(employeeDoc.data());
            setIsEditMode(true);
          }
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      }
    };

    fetchData();
  }, [location.search]);

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const addOrUpdateEmployee = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === '')) {
      alert('All fields are required.');
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        const searchParams = new URLSearchParams(location.search);
        const employeeId = searchParams.get('employeeId');
        await setDoc(doc(db, 'users', employeeId), formData);
      } else {
        const docRef = await addDoc(collection(db, 'users'), formData);
        console.log('Document written with ID: ', docRef.id);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error adding/updating document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={addOrUpdateEmployee} className='p-4'>
      {fieldConfig.map((field) => (
          <Form.Group
            key={field.id}
            className='mb-3'
            controlId={`form${field.id}`}
          >
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type={field.type}
              value={formData[field.id]}
              onChange={(e) => handleChange(e, field.id)}
              required={field.required}
            />
          </Form.Group>
        ))}

        <Button variant='primary' type='submit' disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='ms-2'>
                {isEditMode ? 'Updating Employee...' : 'Adding User...'}
              </span>
            </>
          ) : isEditMode ? (
            'Update Employee'
          ) : (
            'Add Employee'
          )}
        </Button>
      </Form>
    </>
  );
};

export default Employee;
