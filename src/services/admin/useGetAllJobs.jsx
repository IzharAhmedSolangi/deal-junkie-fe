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
  });

  const GetAllJobs = async () => {
    setJobs((prevState) => ({
      ...prevState,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/admin/all_jobs/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setJobs((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: response.data.results.length > 0 ? response.data.results : null,
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
          message: error?.response?.data?.error || "Internal server error",
        }));
      });
  };
  return { GetAllJobs, jobs, setJobs };
}
export default useGetAllJobs;
