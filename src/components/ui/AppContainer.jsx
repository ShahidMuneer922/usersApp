import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const AppContainer = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  // Define an array of routes where you want to apply the specific Container CSS
  const routesWithSpecificContainer = ['/login', '/signup'];

  // Check if the current route is in the array
  const isLogin = routesWithSpecificContainer.includes(pathname);
  return (
    <Container
      fluid
      className={` ${
        isLogin ? 'd-flex align-items-center justify-content-center' : 'w-100'
      }`}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </Container>
  );
};

export default AppContainer;
