import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useGetMyTasks() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [myTasks, setMyTasks] = useState({
    loading: true,
    data: null,
    message: null,
    totalPages: 1,
    currentPage: 1,
  });

  const GetMyTasks = async (page = 1, append = false) => {
    setMyTasks((prevState) => ({
      ...prevState,
      loading: true,
      message: null,
    }));
    await axios
      .get(`${BASE_URL}/api/buyer/my-tasks/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMyTasks((prevState) => ({
          ...prevState,
          loading: false,
          totalPages: response.data.total_pages,
          currentPage: response.data.current_page,
          data: append
            ? [...prevState.data, ...response.data.results]
            : response.data.results,
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
