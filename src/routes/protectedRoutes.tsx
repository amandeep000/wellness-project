import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { data: user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!user) return <Navigate to={"/login"} replace />;
  if (location.pathname === "/account")
    return <Navigate to={"/account/profile"} replace />;

  return <Outlet />;
};
export default ProtectedRoutes;
