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
  });

  const FindJobs = async (payload) => {
    setFindJobs((prevState) => ({
      ...prevState,
      message: null,
    }));
    await axios
      .post(`${BASE_URL}/api/seller/job-search/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFindJobs((prevState) => ({
          ...prevState,
          loading: false,
          buttonLoading: false,
          data: response.data.results.length > 0 ? response.data.results : null,
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
          message: error?.response?.data?.error || "Internal server error",
        }));
      });
  };
  return { FindJobs, findJobs, setFindJobs };
}
export default useFindJobs;
