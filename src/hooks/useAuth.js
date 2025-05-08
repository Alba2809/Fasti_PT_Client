import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

// this hook manages the authentication functionality
export const useAuth = () => {
  // use the AuthContext to get the user, isAuthenticated, errors, signin, loading, and logout functions
  const {
    user,
    isAuthenticated,
    errors: authErrors,
    signin,
    loading,
    logout
  } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm(); // use the useForm hook to manage the form state
  
  const formErrorsArray = Object.values(formErrors); // convert the formErrors object to an array

  // handle the form to sign in the user
  const onSubmit = handleSubmit((data) => {
    if (loading) return;
    signin(data);
  });

  // if there are any form errors, display them in a toast message
  useEffect(() => {
    if (formErrorsArray.length > 0) {
      formErrorsArray.forEach((error) => toast.error(error.message));
    }
  }, [formErrorsArray]);

  // if there are any authentication errors, display them in a toast message
  useEffect(() => {
    if (authErrors.length > 0) {
      authErrors.forEach((error) => toast.error(error));
    }
  }, [authErrors]);

  return {
    user,
    isAuthenticated,
    authErrors,
    formErrors,
    register,
    onSubmit,
    loading,
    logout
  };
};
