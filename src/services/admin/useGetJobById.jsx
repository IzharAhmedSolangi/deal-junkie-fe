import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useGetJobById() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [job, setJob] = useState({
    loading: true,
    data: null,
    message: null,
  });

  const GetJobById = async (jobId) => {
    setJob((prevState) => ({
      ...prevState,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/admin/all_jobs/${jobId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setJob((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "We didn't find any job details",
        }));
      })
      .catch((error) => {
        setJob((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  return { GetJobById, job, setJob };
}
export default useGetJobById;
