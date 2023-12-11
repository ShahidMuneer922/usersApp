import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase.js';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { convertTimestampToDate, formatDate } from '../utils/date.js'

const getUsers=async()=>{
  const querySnapshot = await getDocs(collection(db, 'users'));
  const userData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userData
}

// Separate EmployeeRow component
const EmployeeRow = ({ employee,fetchUsers }) => {
  const navigate=useNavigate()
  const [isDeleting,setIsDeleteing]=useState()
  const handleDelete = async (employeeId) => {
    setIsDeleteing(true);
    try {
      await deleteDoc(doc(db, 'users', employeeId));
      // Refresh data after deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleteing(false);
    }
  };
  return (
    <tr>
      <td>{employee.id}</td>
      <td>{`${employee.first} ${employee.last}`}</td>
      <td>{formatDate(convertTimestampToDate(employee.dateOfBirth),'MM-dd-yyyy')}</td>
      <td>{employee.email}</td>
      <td>{employee.department}</td>
      <td>{employee.jobTitle}</td>
      <td>{formatDate(convertTimestampToDate(employee.hireDate),'MM-dd-yyyy')}</td>
      <td>
        <Button variant='primary' onClick={()=>navigate(`/add-employee?employeeId=${employee.id}`)} >
          Edit
        </Button>{' '}
        <Button
          variant='danger'
          onClick={() => handleDelete(employee.id)}
          disabled={isDeleting}
          style={{minWidth:"73px"}}
        >
          {isDeleting ? (
            <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
          ) : (
            'Delete'
          )}
        </Button>
      </td>
    </tr>
  );
};

const Employees = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()


  const handleEdit = (employeeId) => {
    // Implement your edit logic here
    console.log(`Edit clicked for employee with ID: ${employeeId}`);
  };

  const fetchUsers = async () => {
    try {
    const userData=await getUsers()
      setData(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className='vh-100 p-4 '>
      <div className='d-flex justify-content-between mb-4'>
        <h3>Employees</h3>
      <Button onClick={()=>navigate('/add-employee')}>Add New Employee</Button>
      </div>
      <div>
        {loading ? (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : (
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
