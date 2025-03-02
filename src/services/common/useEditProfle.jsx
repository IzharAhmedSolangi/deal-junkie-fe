import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

function useEditProfile() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const { setUserInfo } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const EditProfile = async (payload) => {
    setLoading(true);
    await axios
      .put(`${BASE_URL}/api/profile/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return { EditProfile, loading, setShowMessage };
}
export default useEditProfile;
