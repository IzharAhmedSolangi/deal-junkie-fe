/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

function useForgotPassword() {
  const BASE_URL = "";
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const ForgotPassword = async (payload, setAuthModalType) => {
    setLoading(true);
    setErrorMessage(null);
    await axios
      .post(`${BASE_URL}/api/forgot-password/`, payload)
      .then((response) => {
        setAuthModalType("verify-otp");
        setLoading(false);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage("Invalid Credientials");
        setLoading(false);
      });
  };
  return { ForgotPassword, loading, errorMessage };
}
export default useForgotPassword;
