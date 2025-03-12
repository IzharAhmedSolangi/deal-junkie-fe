import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useGetAllJobs() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [jobs, setJobs] = useState({
    loading: true,
    buttonLoading: false,
    data: null,
    message: null,
    totalPages: 1,
    currentPage: 1,
  });

  const GetAllJobs = async (page = 1, append = false) => {
    setJobs((prevState) => ({
      ...prevState,
      loading: true,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/admin/all_jobs/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setJobs((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          totalPages: response.data.total_pages,
          currentPage: response.data.current_page,
          data: append
            ? [...prevState.data, ...response.data.results]
            : response.data.results,
          message:
            response.data.results.length > 0 ? null : "We didn't find any jobs",
        }));
      })
      .catch((error) => {
        setJobs((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  return { GetAllJobs, jobs, setJobs };
}
export default useGetAllJobs;
