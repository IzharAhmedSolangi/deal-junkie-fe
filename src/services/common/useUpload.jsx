import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";

function useUpload() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [upload, setUpload] = useState({
    loading: false,
    url: null,
    message: null,
  });

  const Upload = async (payload) => {
    setUpload((prevState) => ({
      ...prevState,
      loading: true,
      url: null,
      message: null,
    }));
    await axios
      .post(`${BASE_URL}/api/upload-image/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        SuccessToaster("Uploaded", "Successfully uploaded");
        setUpload((prevState) => ({
          ...prevState,
          loading: false,
          url: response?.data?.image_url,
          message: null,
        }));
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.error);
        setUpload((prevState) => ({
          ...prevState,
          loading: false,
          url: null,
          message: error?.response?.data?.message,
        }));
      });
  };
  return { Upload, upload, setUpload };
}
export default useUpload;
