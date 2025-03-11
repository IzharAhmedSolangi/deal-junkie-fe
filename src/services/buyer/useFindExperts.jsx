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
    message: null,
    totalPages: 1,
    currentPage: 1,
  });

  const FindExperts = async (payload, page = 1, append = false) => {
    setFindExperts((prevState) => ({
      ...prevState,
      loading: true,
      message: null,
    }));
    await axios
      .post(`${BASE_URL}/api/seller/get-sellers/?page=${page}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFindExperts((prevState) => ({
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
              : "We didn't find any experts that matches your details",
        }));
      })
      .catch((error) => {
        setFindExperts((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: null,
          message: error?.response?.data?.error || "Internal server error",
        }));
      });
  };
  return { FindExperts, findExperts, setFindExperts };
}
export default useFindExperts;
