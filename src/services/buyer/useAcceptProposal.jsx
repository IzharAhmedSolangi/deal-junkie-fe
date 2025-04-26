import axios from "axios";
import { useState } from "react";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";

function useAcceptProposal() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [acceptProposal, setAcceptProposal] = useState({
    loading: false,
    data: null,
    message: null
  });

  const AcceptProposal = async (proposalId) => {
    setAcceptProposal((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      message: null
    }));
    await axios
      .post(
        `${BASE_URL}/api/buyer/proposals/${proposalId}/accept/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        setAcceptProposal((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "Proposal accepted"
        }));
        SuccessToaster("Proposal Accepted", response?.data?.message);
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.message);
        setAcceptProposal((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error"
        }));
      });
  };
  return { AcceptProposal, acceptProposal };
}

export default useAcceptProposal;
