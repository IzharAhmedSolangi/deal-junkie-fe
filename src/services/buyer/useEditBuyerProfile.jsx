import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";

function useEditBuyerProfile() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const { setUserInfo } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const EditBuyerProfile = async (payload) => {
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
        SuccessToaster(
          "Profile updated",
          "Your profile details successfully updated"
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorToaster("Error", error?.response?.data?.error);
      });
  };
  return { EditBuyerProfile, loading, setShowMessage };
}
export default useEditBuyerProfile;
