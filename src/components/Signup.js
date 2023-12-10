import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Password does not match');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      setSuccess('User added successfully');
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card.Body>
        <h2 className='text-center mb-4'>SIGN UP</h2>

        <Form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
          <Form.Group id='email'>
            <Form.Label>Email</Form.Label>
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
          <Form.Group id='password-confirmation'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button className='w-100' type='submit' disabled={isLoading}>
            {isLoading ? <Spinner animation='border' size='sm' /> : 'Sign Up'}
          </Button>
          <div className='w-100 text-center mt-2'>
            Already Have An Account? <a href='/login'>Log In</a>
          </div>
          {error && <Alert variant='danger'>{error}</Alert>}
          {success && <Alert variant='success'>{success}</Alert>}
        </Form>
      </Card.Body>
    </>
  );
};

export default Signup;
