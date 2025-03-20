import { useState } from "react";
import axios from "axios";
import { setAccessToken, setRefreshToken } from "../../storage/storage";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../common/useCurrentUser";

function useLogin() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const Navigate = useNavigate();
  const { getCurrentUser } = useCurrentUser();

  const Login = async (payload, handleClose) => {
    setLoading(true);
    setErrorMessage(null);
    await axios
      .post(`${BASE_URL}/api/accounts/login/`, payload)
      .then((response) => {
        setLoading(false);
        handleClose();
        setErrorMessage(null);
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
        getCurrentUser(response.data.access_token);
        if (response.data.user.role === "admin") {
          // window.location.href = "/#/admin/dashboard";
          Navigate("/admin/dashboard");
        } else {
          // window.location.href = "/#/";
          Navigate("/");
        }
      })
      .catch((error) => {
        setErrorMessage(error?.response?.data?.message);
        setLoading(false);
      });
  };
  return { Login, loading, errorMessage };
}
export default useLogin;
