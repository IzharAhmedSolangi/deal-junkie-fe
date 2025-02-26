/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import { setAccessToken, setRefreshToken } from "../storage/storage";

function useLogin() {
  const BASE_URL = "";
  const { getCurrentUser } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const Login = async (payload) => {
    setLoading(true);
    setErrorMessage(null);
    await axios
      .post(`${BASE_URL}/api/login/`, payload)
      .then((response) => {
        setLoading(false);
        setErrorMessage(null);
        setAccessToken(response.data.tokens.access);
        setRefreshToken(response.data.tokens.refresh);
        getCurrentUser(response.data.tokens.access);
        window.location.href = "/";
      })
      .catch((error) => {
        setErrorMessage("Invalid Credientials");
        setLoading(false);
      });
  };
  return { Login, loading, errorMessage };
}
export default useLogin;
