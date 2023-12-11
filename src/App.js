import React from 'react';
import { Container } from 'react-bootstrap';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  Navigate
} from 'react-router-dom';
import './App.css';
import Employees from './components/Employees.js';
import Login from './components/Login.js';
import Employee from './components/Employee.js';
import Signup from './components/Signup.js';
import { AuthProvider } from './context/AuthContext.js';
import AppContainer from './components/ui/AppContainer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  // const navigate = useNavigate();

  return (
    <Router>
      <AuthProvider>
        <AppContainer>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/employees" />} /> */}
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/employees'
              element={<PrivateRoute element={<Employees />} />}
            />
            <Route
              path='/add-employee'
              element={<PrivateRoute element={<Employee />} />}
            />
            <Route path='*' element={<Navigate to='/employees' replace />} />
          </Routes>
        </AppContainer>
      </AuthProvider>
    </Router>
  );
}

export default App;
