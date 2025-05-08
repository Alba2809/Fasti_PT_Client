import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

// this component checks if the user has the required role and redirects to the home page if not
function RolValidator({ roles }) {
  // use the useAuthContext hook to get the user state
  const { user } = useAuthContext();

  /* roles can be array or a string */
  if (Array.isArray(roles)) {
    // if the user's role is not in the array, redirect to the home page
    if (!roles.includes(user.role.name)) return <Navigate to="/" />;
  } else if (typeof roles === "string") {
    // if the user's role is not the same as the required role, redirect to the home page
    if (user.role.name !== roles) return <Navigate to="/" />;
  }

  // if the user has the required role, display the Outlet component
  return <Outlet />;
}

export default RolValidator;
