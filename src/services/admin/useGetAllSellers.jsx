import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useGetAllSellers() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [sellers, setSellers] = useState({
    loading: true,
    buttonLoading: false,
    data: null,
    message: null,
  });

  const GetAllSellers = async () => {
    setSellers((prevState) => ({
      ...prevState,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/admin/sellers/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSellers((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: response.data.results.length > 0 ? response.data.results : null,
          message:
            response.data.results.length > 0
              ? null
              : "We didn't find any seller",
        }));
      })
      .catch((error) => {
        setSellers((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: null,
          message: error?.response?.data?.error || "Internal server error",
        }));
      });
  };
  return { GetAllSellers, sellers, setSellers };
}
export default useGetAllSellers;
