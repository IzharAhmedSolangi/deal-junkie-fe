import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";
import { useNavigate } from "react-router-dom";

function useEditProfile() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const Navigate = useNavigate();
  const { setUserInfo } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const EditProfile = async (
    payload,
    isNavigate = false,
    showMessage = false
  ) => {
    setLoading(true);
    await axios
      .put(`${BASE_URL}/api/seller/profile/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
        setLoading(false);
        if (showMessage) {
          SuccessToaster(
            "Profile updated",
            "Your profile details successfully updated!"
          );
        }
        if (
          response.data?.seller_profile === null &&
          response.data?.user?.role === "seller" &&
          isNavigate === true
        ) {
          Navigate("/dashboard/edit-profile");
        } else if (isNavigate === true) {
          Navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        ErrorToaster("Error", error?.response?.data?.message);
      });
  };
  return { EditProfile, loading };
}
export default useEditProfile;
