import axios from "axios";
import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { removeAccessToken, removeRefreshToken } from "../../storage/storage";

const useCurrentUser = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { setUserInfo, setUpdateResponse } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const getCurrentUser = async (token) => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/api/seller/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUpdateResponse(false);
        setLoading(false);
        setUserInfo(response.data);
      })
      .catch((error) => {
        setLoading(false);
        if (error?.response?.status === 401) {
          removeAccessToken();
          removeRefreshToken();
          window.location.href = "/";
        }
      });
  };
  return { loading, getCurrentUser };
};
export default useCurrentUser;
