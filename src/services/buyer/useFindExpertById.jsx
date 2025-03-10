import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useFindExpertById() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [findExpert, setFindExpert] = useState({
    loading: true,
    data: null,
    message: null,
  });

  const FindExpert = async (sellerId) => {
    setFindExpert((prevState) => ({
      ...prevState,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/seller/sellers/${sellerId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFindExpert((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "We didn't find any expert details",
        }));
      })
      .catch((error) => {
        setFindExpert((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.error || "Internal server error",
        }));
      });
  };
  return { FindExpert, findExpert, setFindExpert };
}
export default useFindExpertById;
