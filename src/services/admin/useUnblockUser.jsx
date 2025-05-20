import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";
import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

function useUnblockUser() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const { setUpdateResponse } = useContext(GlobalContext);

  const [unblockUser, setUnblockUser] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const UnblockUser = async (userId, handleClose) => {
    setUnblockUser((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      message: null,
    }));
    await axios
      .post(
        `${BASE_URL}/api/admin/unblock-user/${userId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        handleClose();
        setUpdateResponse(true);
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
  return { UnblockUser, unblockUser };
}

export default useUnblockUser;
