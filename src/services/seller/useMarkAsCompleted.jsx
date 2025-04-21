/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster } from "../../components/shared/Toster";

function useMarkAsCompleted() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [completed, setCompleted] = useState({
    loading: false,
    data: null,
    error: null,
    success: false,
  });

  const MarkAsCompleted = async (payload) => {
    setCompleted((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      error: null,
      success: false,
    }));
    await axios
      .post(`${BASE_URL}/api/buyer/order-submission/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCompleted((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: null,
          success: true,
        }));
      })
      .catch((error) => {
        setCompleted((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: error?.response?.data?.message,
          success: false,
        }));
        ErrorToaster("Error", error?.response?.data?.message);
      });
  };
  return { MarkAsCompleted, completed, setCompleted };
}
export default useMarkAsCompleted;
