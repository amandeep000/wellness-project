// components/ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
