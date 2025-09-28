import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import LandingPage from "../pages/pages/LandingPage";
import NotFound from "../pages/pages/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Dashboards
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashBoard";
import NGODashboard from "../pages/dashboard/NGODashboard";
import UserDashboard from "../pages/dashboard/UserDashboard";

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    switch (user.role) {
      case "super-admin":
        return <Navigate to="/dashboard/super-admin" replace />;
      case "ngo":
        return <Navigate to="/dashboard/ngo" replace />;
      default:
        return <Navigate to="/dashboard/user" replace />;
    }
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Dashboards */}
      <Route
        path="/dashboard/super-admin"
        element={
          <ProtectedRoute role="super-admin">
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ngo"
        element={
          <ProtectedRoute role="ngo">
            <NGODashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
