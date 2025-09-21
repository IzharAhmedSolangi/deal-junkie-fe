/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";

function useConnectStripe() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [connectStripe, setConnectStripe] = useState({
    loading: false,
    data: null,
    error: null,
    success: false,
  });

  const ConnectStripe = async (payload) => {
    setConnectStripe((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      error: null,
      success: false,
    }));
    await axios
      .post(`${BASE_URL}/api/seller/resend-stripe-onboarding/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        SuccessToaster("Success", response?.data?.message);
        setConnectStripe((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: null,
          success: true,
        }));
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.message);
        setConnectStripe((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: error?.response?.data?.message,
          success: false,
        }));
      });
  };
  return { ConnectStripe, connectStripe, setConnectStripe };
}
export default useConnectStripe;
