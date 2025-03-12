import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useNotifications() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [notifications, setNotifications] = useState({
    loading: true,
    data: null,
    message: null
  });

  const GetNotifications = async (url) => {
    setNotifications((prevState) => ({
      ...prevState,
      message: null
    }));
    await axios
      .get(`${BASE_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setNotifications((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "We didn't find any notifications"
        }));
      })
      .catch((error) => {
        setNotifications((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error"
        }));
      });
  };
  return { GetNotifications, notifications, setNotifications };
}
export default useNotifications;
