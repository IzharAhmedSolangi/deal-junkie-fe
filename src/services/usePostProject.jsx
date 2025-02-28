/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../storage/storage";

function usePostProject() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [postProject, setPostProject] = useState({
    loading: false,
    data: null,
    error: null,
    success: false,
  });

  const PostProject = async (payload) => {
    setPostProject((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      error: null,
      success: false,
    }));
    await axios
      .post(`${BASE_URL}/api/buyer/post-project/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPostProject((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: null,
          success: true,
        }));
      })
      .catch((error) => {
        setPostProject((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: error?.response?.data?.error,
          success: false,
        }));
      });
  };
  return { PostProject, postProject };
}
export default usePostProject;
