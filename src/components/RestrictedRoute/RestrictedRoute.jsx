import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserAuthenticated } from 'redux/selectors';

const RestrictedRoute = ({ children, redirectTo = '/' }) => {
  const authenticated = useSelector(selectUserAuthenticated);
  return authenticated ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
