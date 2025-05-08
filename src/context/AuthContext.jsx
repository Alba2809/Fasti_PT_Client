import { createContext, use, useEffect, useState } from "react";
import {
  loginRequest,
  verifyTokenRequest,
  getUserRequest,
  logoutRequest,
} from "../api/auth";
import { Toaster } from "react-hot-toast";

// create the AuthContext context
export const AuthContext = createContext(null);

// create the useAuthContext hook to use the AuthContext context
export const useAuthContext = () => {
  const context = use(AuthContext);

  return context;
};

// create the AuthContextProvider component to provide the AuthContext context to the children components
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // define the signin function to sign in the user and set the user state
  const signin = async (user) => {
    try {
      setLoading(true);
      const res = await loginRequest(user); // send the user data to the backend to sign in the user
      setUser(res.data);

      setIsAuthenticated(true);
    } catch (error) {
      // if there is an error, set the error state to show the error message
      setErrors(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // define the getUser function to get the user data from the backend
  const getUser = async () => {
    try {
      const res = await getUserRequest();
      setUser(res.data);
      return res.data;
    } catch (error) {}
  };

  // define the logout function to sign out the user and set the user state to null
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    logoutRequest();
  };

  // useEffect to clear the errors state after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // useEffect to check if the user is authenticated and set the user state
  useEffect(() => {
    async function checkLogin() {
      try {
        // send a request to the backend to verify the token
        const res = await verifyTokenRequest();
        if (!res.data) { // if the token is not valid, set the user state to null
          setIsAuthenticated(false);
          return;
        }

        // if the token is valid, set the user state to the user data
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        // if there is an error, set the user state to null
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext
      value={{
        signin,
        logout,
        getUser,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      <Toaster />
      {children}
    </AuthContext>
  );
};
