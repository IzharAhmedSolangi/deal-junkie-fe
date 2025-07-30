/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster } from "../../components/shared/Toster";

function useSendOffer() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [sendOffer, setSendOffer] = useState({
    loading: false,
    data: null,
    error: null,
    success: false,
  });

  const SendOffer = async (payload) => {
    setSendOffer((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      error: null,
      success: false,
    }));
    await axios
      .post(`${BASE_URL}/api/seller/custom-offer/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSendOffer((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: null,
          success: true,
        }));
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.message);
        setSendOffer((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: error?.response?.data?.message,
          success: false,
        }));
      });
  };
  return { SendOffer, sendOffer, setSendOffer };
}
export default useSendOffer;
