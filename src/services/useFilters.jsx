/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

function useFilters() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const AddFilters = async (payload) => {
    setLoading(true);
    setErrorMessage(null);
    await axios
      .post(`${BASE_URL}/api/seller/get-sellers/`, payload)
      .then((response) => {
        setLoading(false);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage(error?.response?.data?.error);
        setLoading(false);
      });
  };
  return { AddFilters, loading, errorMessage };
}
export default useFilters;
