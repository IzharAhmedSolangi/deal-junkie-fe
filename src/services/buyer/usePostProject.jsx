/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster } from "../../components/shared/Toster";
import GlobalContext from "../../context/GlobalContext";

function usePostProject() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { setUpdateResponse } = useContext(GlobalContext);
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
        setUpdateResponse(true);
        setPostProject((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: null,
          success: true,
        }));
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.message);
        setPostProject((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          error: error?.response?.data?.message,
          success: false,
        }));
      });
  };
  return { PostProject, postProject, setPostProject };
}
export default usePostProject;
