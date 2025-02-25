import { useState } from "react";
import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import { setAccessToken, setRefreshToken } from "../storage/storage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const BASE_URL = "";
  const { getCurrentUser } = useCurrentUser();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const Login = async (payload) => {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/api/login/`, payload)
      .then((response) => {
        setLoading(false);
        if (response.data.enable_email_authentication) {
          Navigate(`/email-authentication/${payload.email}`);
        } else {
          setAccessToken(response.data.tokens.access);
          setRefreshToken(response.data.tokens.refresh);
          window.location.href = "/";
          getCurrentUser(response.data.tokens.access);
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          text:
            error?.response?.data?.message ||
            "Oops! Something went wrong on our end. Please give us a moment to fix it. Feel free to try again later",
          customClass: {
            confirmButton: "custom-red-button",
          },
        });
      });
  };
  return { Login, loading };
}
export default useLogin;
