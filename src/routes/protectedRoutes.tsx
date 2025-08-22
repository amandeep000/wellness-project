import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { data: user, isLoading, error } = useAuth();

  if (isLoading) return <p>Loading...</p>;
  if (error || !user) {
    console.log("Redirecting to login due to:", error || "No user");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
