import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";
import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

function useBlockUser() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const { setUpdateResponse } = useContext(GlobalContext);

  const [blockUser, setBlockUser] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const BlockUser = async (userId, handleClose) => {
    setBlockUser((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      message: null,
    }));
    await axios
      .post(
        `${BASE_URL}/api/admin/block-user/${userId}/`,
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
        setBlockUser((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data
            ? null
            : "Your have successfully blocked this user",
        }));
        SuccessToaster("Blocked", response?.data?.message);
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.message);
        setBlockUser((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  return { BlockUser, blockUser };
}

export default useBlockUser;
