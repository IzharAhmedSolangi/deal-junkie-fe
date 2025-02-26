/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

function useSignup() {
  const BASE_URL = "";
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const Signup = async (payload) => {
    setLoading(true);
    setErrorMessage(null);
    await axios
      .post(`${BASE_URL}/api/signup/`, payload)
      .then((response) => {
        setLoading(false);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage(error?.response?.message);
        setLoading(false);
      });
  };
  return { Signup, loading, errorMessage };
}
export default useSignup;
