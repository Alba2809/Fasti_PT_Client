import { useState } from "react";
import { getShiftsRequest } from "../api/shift";

export const useShift = () => {
  const [loading, setLoading] = useState(false);
  const [shifts, setShifts] = useState([]);

  const getShifts = async () => {
    try {
      setLoading(true);
      const res = await getShiftsRequest();

      setShifts(res.data);
    } catch (error) {
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
