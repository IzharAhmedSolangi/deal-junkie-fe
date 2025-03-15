import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useFindJobs() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [findJobs, setFindJobs] = useState({
    loading: true,
    buttonLoading: false,
    data: null,
    message: null,
    totalPages: 1,
    currentPage: 1,
  });

  const FindJobs = async (payload, page = 1, append = false) => {
    await axios
      .post(`${BASE_URL}/api/seller/job-search/?page=${page}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFindJobs((prevState) => ({
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
              : "We didn't find any jobs that matches your details",
        }));
      })
      .catch((error) => {
        setFindJobs((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  return { FindJobs, findJobs, setFindJobs };
}
export default useFindJobs;
