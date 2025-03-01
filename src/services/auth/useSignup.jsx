/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

function useSignup() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const Signup = async (payload, setAuthModalType) => {
    setLoading(true);
    setErrorMessage(null);
    await axios
      .post(`${BASE_URL}/api/accounts/create/`, payload)
      .then((response) => {
        setLoading(false);
        setErrorMessage(null);
        setAuthModalType("successfully-registered");
      })
      .catch((error) => {
        setErrorMessage(error?.response?.data?.error);
        setLoading(false);
      });
  };
  return { Signup, loading, errorMessage };
}
export default useSignup;
