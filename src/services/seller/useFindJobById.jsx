import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useFindJobById() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [findJob, setFindJob] = useState({
    loading: true,
    data: null,
    message: false,
  });

  const FindJob = async (jobId) => {
    setFindJob((prevState) => ({
      ...prevState,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/seller/jobs/${jobId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFindJob((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "We didn't find any job details",
        }));
      })
      .catch((error) => {
        setFindJob((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.error || "Internal server error",
        }));
      });
  };
  return { FindJob, findJob };
}
export default useFindJobById;
