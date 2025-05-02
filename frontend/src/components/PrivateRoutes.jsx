import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user's role is not allowed, redirect to employee dashboard
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/employee-dashboard" />;
  }

  return element;
};

export default PrivateRoute;
