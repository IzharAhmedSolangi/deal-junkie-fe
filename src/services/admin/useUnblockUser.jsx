import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";
import { useState } from "react";

function useUnblockUser() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [unblockUser, setUnblockUser] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const BlockUser = async (userId) => {
    setUnblockUser((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      message: null,
    }));
    await axios
      .patch(
        `${BASE_URL}/api/admin/block-user/${userId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUnblockUser((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data
            ? null
            : "Your have successfully unblocked this user",
        }));
        SuccessToaster("Unblocked", response?.data?.message);
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.message);
        setUnblockUser((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  return { BlockUser, unblockUser };
}

export default useUnblockUser;
