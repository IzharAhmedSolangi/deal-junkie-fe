import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useGetMyTasks() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [myTasks, setMyTasks] = useState({
    loading: true,
    data: null,
    message: false,
  });

  const GetMyTasks = async () => {
    setMyTasks((prevState) => ({
      ...prevState,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/buyer/my-tasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMyTasks((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data.results.length > 0 ? response.data.results : null,
          message:
            response.data.results.length > 0
              ? null
              : "We didn't find any tasks",
        }));
      })
      .catch((error) => {
        setMyTasks((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.error || "Internal server error",
        }));
      });
  };
  return { GetMyTasks, myTasks, setMyTasks };
}
export default useGetMyTasks;
