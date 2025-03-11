import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useGetSellerById() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [seller, setSeller] = useState({
    loading: true,
    data: null,
    message: null,
  });

  const GetSellerById = async (sellerId) => {
    setSeller((prevState) => ({
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
        setSeller((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "We didn't find any buyer details",
        }));
      })
      .catch((error) => {
        setSeller((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.error || "Internal server error",
        }));
      });
  };
  return { GetSellerById, seller, setSeller };
}
export default useGetSellerById;
