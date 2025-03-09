import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useFindExperts() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [findExperts, setFindExperts] = useState({
    loading: true,
    buttonLoading: false,
    data: null,
    message: false,
    showInitial: false,
  });

  const FindExperts = async (payload) => {
    setFindExperts((prevState) => ({
      ...prevState,
      message: null,
    }));
    await axios
      .post(`${BASE_URL}/api/seller/get-sellers/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFindExperts((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: response.data.results.length > 0 ? response.data.results : null,
          message:
            response.data.results.length > 0
              ? null
              : "We didn't find any experts that matches your details",
          showInitial: false,
        }));
      })
      .catch((error) => {
        setFindExperts((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: null,
          message: error?.response?.data?.error || "Internal server error",
          showInitial: false,
        }));
      });
  };
  return { FindExperts, findExperts, setFindExperts };
}
export default useFindExperts;
