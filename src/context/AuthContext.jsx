import { createContext, use, useEffect, useState } from "react";
import {
  loginRequest,
  verifyTokenRequest,
  getUserRequest,
  logoutRequest
} from "../api/auth";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = use(AuthContext);
  
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signin = async (user) => {
    try {
      setLoading(true);
      const res = await loginRequest(user);
      setUser(res.data);

      setIsAuthenticated(true);
    } catch (error) {
      console.log(error)
      setErrors(error?.response?.data)
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await getUserRequest();
      setUser(res.data)
      return res.data;
    } catch (error) {}
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    logoutRequest();
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
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
