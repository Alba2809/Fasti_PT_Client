import { useState } from "react";
import { getShiftsRequest } from "../api/shift";

// this hook manages the shifts functionality
export const useShift = () => {
  const [loading, setLoading] = useState(false);
  const [shifts, setShifts] = useState([]);

  // get the shifts from the backend
  const getShifts = async () => {
    try {
      setLoading(true);
      const res = await getShiftsRequest();

      setShifts(res.data);
    } catch (error) {
      // if there is an error, display the error messages
      const errors = error?.response?.data;
      if (errors) {
        errors.map((error) => toast.error(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    getShifts,
    loading,
    shifts,
  };
};
