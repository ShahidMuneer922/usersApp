import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner, } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        setIsLoading(false);
        // Redirect to '/employees' upon successful login
        navigate('/employees');
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card.Body style={{maxWidth:"400px"}}>
        <h2 className='text-center mb-4'>LOGIN</h2>

        <Form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
          <Form.Group id='email'>
            <Form.Label>User Email</Form.Label>
            <Form.Control
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group id='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button className='w-100' type='submit' disabled={isLoading}>
            {isLoading ? <Spinner animation='border' size='sm' /> : 'Login'}
          </Button>
          <div className='w-100 text-center mt-2'>
            Don't Have An Account? <NavLink to={'/signup'}>Sign Up</NavLink>
          </div>
        {error && <Alert variant='danger'>{error}</Alert>}

        </Form>
      </Card.Body>
    </>
  );
};

export default Login;
