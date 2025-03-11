import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useGetBuyerById() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [buyer, setBuyer] = useState({
    loading: true,
    data: null,
    message: null,
  });

  const GetBuyerById = async (buyerId) => {
    setBuyer((prevState) => ({
      ...prevState,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/seller/buyers/${buyerId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBuyer((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "We didn't find any buyer details",
        }));
      })
      .catch((error) => {
        setBuyer((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.error || "Internal server error",
        }));
      });
  };
  return { GetBuyerById, buyer, setBuyer };
}
export default useGetBuyerById;
