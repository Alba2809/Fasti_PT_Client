import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function RolValidator({ roles }) {
  const { user } = useAuthContext();

  /* roles can be array or a string */
  if (Array.isArray(roles)) {
    if (!roles.includes(user.role.name)) return <Navigate to="/" />;
  } else if (typeof roles === "string") {
    if (user.role.name !== roles) return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default RolValidator;
