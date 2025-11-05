import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("authToken");

  // If token doesn’t exist, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render the dashboard routes
  return <Outlet />;
};

export default ProtectedRoute;
