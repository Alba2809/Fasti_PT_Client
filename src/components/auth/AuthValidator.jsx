import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

// this component checks if the user is authenticated and redirects to the login page if not
function AuthValidator() {
  // use the useAuthContext hook to get the loading and isAuthenticated states
  const { loading, isAuthenticated } = useAuthContext();

  // if the verification is in progress, display a loading message
  if (loading) return <h1>Loading...</h1>;

  // if the user is not authenticated, redirect to the login page
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  // if the user is authenticated, display the Outlet component
  return <Outlet />;
}

export default AuthValidator;
