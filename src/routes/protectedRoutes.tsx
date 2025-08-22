import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { data: user, isLoading } = useAuth();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (user) return <Navigate to={"/login"} replace />;
  if (location.pathname === "/account")
    return <Navigate to={"/account/profile"} replace />;
};
export default ProtectedRoutes;
