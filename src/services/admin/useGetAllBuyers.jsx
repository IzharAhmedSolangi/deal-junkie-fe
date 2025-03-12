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
    totalPages: 1,
    currentPage: 1,
  });

  const GetAllBuyers = async (page = 1, append = false) => {
    setBuyers((prevState) => ({
      ...prevState,
      loading: true,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/admin/buyers/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBuyers((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          totalPages: response.data.total_pages,
          currentPage: response.data.current_page,
          data: append
            ? [...prevState.data, ...response.data.results]
            : response.data.results,
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
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  return { GetAllBuyers, buyers, setBuyers };
}
export default useGetAllBuyers;
