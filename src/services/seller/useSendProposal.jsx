/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster } from "../../components/shared/Toster";

function useSendProposal() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [sendProposal, setSendProposal] = useState({
    loading: false,
    data: null,
    error: null,
    success: false,
  });

  const SendProposal = async (payload) => {
    setSendProposal((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      error: null,
      success: false,
    }));
    await axios
      .post(`${BASE_URL}/api/seller/send-proposal/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSendProposal((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: null,
          success: true,
        }));
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.error);
        setSendProposal((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: error?.response?.data?.error,
          success: false,
        }));
      });
  };
  return { SendProposal, sendProposal };
}
export default useSendProposal;
