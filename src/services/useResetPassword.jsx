/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

function useResetPassword() {
  const BASE_URL = "";
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const ResetPassword = async (payload, setAuthModalType) => {
    setLoading(true);
    setErrorMessage(null);
    await axios
      .post(`${BASE_URL}/api/reset-password/`, payload)
      .then((response) => {
        setAuthModalType("success-after-reset");
        setLoading(false);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage("Invalid Credientials");
        setLoading(false);
      });
  };
  return { ResetPassword, loading, errorMessage };
}
export default useResetPassword;
