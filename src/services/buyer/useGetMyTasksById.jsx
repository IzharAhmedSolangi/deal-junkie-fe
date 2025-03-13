import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useGetMyTasksById() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [myTask, setMyTask] = useState({
    loading: true,
    data: null,
    message: null,
  });

  const GetMyTaskById = async (taskId) => {
    await axios
      .get(`${BASE_URL}/api/buyer/my-tasks/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMyTask((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "We didn't find any task",
        }));
      })
      .catch((error) => {
        setMyTask((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  return { GetMyTaskById, myTask, setMyTask };
}
export default useGetMyTasksById;
