import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { useState } from "react";
import { ErrorToaster } from "../../components/shared/Toster";

function useDownload() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [loading, setLoading] = useState(false);

  const Download = async (filename) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/accounts/download-file/?filename=${filename}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      ErrorToaster(
        "Error",
        error?.response?.data?.message || "Download failed"
      );
    } finally {
      setLoading(false);
    }
  };
  return { Download, loading };
}

export default useDownload;
