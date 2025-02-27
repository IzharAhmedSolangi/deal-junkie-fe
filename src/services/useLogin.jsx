/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import { setAccessToken, setRefreshToken } from "../storage/storage";

function useLogin() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { getCurrentUser } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const Login = async (payload) => {
    setLoading(true);
    setErrorMessage(null);
    await axios
      .post(`${BASE_URL}/api/accounts/login/`, payload)
      .then((response) => {
        setLoading(false);
        setErrorMessage(null);
        setAccessToken(response.data.acccess_token);
        setRefreshToken(response.data.refresh_token);
        getCurrentUser(response.data.acccess_token);
        window.location.href = "/";
      })
      .catch((error) => {
        setErrorMessage(error?.response?.data?.error);
        setLoading(false);
      });
  };
  return { Login, loading, errorMessage };
}
export default useLogin;
