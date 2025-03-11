import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useGetAllBuyers() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [buyers, setBuyers] = useState({
    loading: true,
    buttonLoading: false,
    data: null,
    message: null,
  });

  const GetAllJobs = async () => {
    setBuyers((prevState) => ({
      ...prevState,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/admin/buyers/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBuyers((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: response.data.results.length > 0 ? response.data.results : null,
          message:
            response.data.results.length > 0
              ? null
              : "We didn't find any buyers",
        }));
      })
      .catch((error) => {
        setBuyers((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: null,
          message: error?.response?.data?.error || "Internal server error",
        }));
      });
  };
  return { GetAllJobs, buyers, setBuyers };
}
export default useGetAllBuyers;
