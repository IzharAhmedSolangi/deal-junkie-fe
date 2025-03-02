/* eslint-disable no-unused-vars */
import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { useState } from "react";

function useChangePassword() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [loading, setLoading] = useState(false);

  const ChangePassword = async (payload) => {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/api/accounts/change-password/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return { ChangePassword, loading };
}
export default useChangePassword;
