import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { data: user, isLoading } = useAuth();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return user ? <Outlet /> : <Navigate to={"/login"} replace />;
};
export default ProtectedRoutes;
