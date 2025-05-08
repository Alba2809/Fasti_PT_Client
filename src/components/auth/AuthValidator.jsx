import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function AuthValidator() {
  const { loading, isAuthenticated } = useAuthContext();

  if (loading) return <h1>Loading...</h1>;

  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default AuthValidator;
