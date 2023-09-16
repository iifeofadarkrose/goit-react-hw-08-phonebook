import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserAuthenticated } from 'redux/selectors';

const PrivareRoute = ({ children, redirectTo = '/login' }) => {
  const authenticated = useSelector(selectUserAuthenticated);
  return authenticated ? children : <Navigate to={redirectTo} replace />;
};

export default PrivareRoute;
