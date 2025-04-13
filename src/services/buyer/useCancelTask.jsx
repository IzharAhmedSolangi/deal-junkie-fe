import axios from "axios";
import { useContext, useState } from "react";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";
import GlobalContext from "../../context/GlobalContext";

function useCancelTask() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { setUpdateResponse } = useContext(GlobalContext);
  const token = getAccessToken();
  const [cancelTask, setCancelTask] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const CancelTask = async (taskId) => {
    setCancelTask((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      message: null,
    }));
    await axios
      .patch(
        `${BASE_URL}/api/buyer/project/${taskId}/cancel/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUpdateResponse(true);
        setCancelTask((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "Your task successfully Cancelled",
        }));
        SuccessToaster("Task Cancelled", response?.data?.message);
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.message);
        setCancelTask((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  return { CancelTask, cancelTask };
}

export default useCancelTask;
