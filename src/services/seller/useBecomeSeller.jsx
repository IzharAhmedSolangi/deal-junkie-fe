/* eslint-disable no-unused-vars */
import axios from "axios";
import { getAccessToken } from "../../storage/storage";
import { useState } from "react";
import { ErrorToaster } from "../../components/shared/Toster";

function useBecomeSeller() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [sellerLoading, setSellerLoading] = useState(false);

  const BecomeSeller = async (payload) => {
    setSellerLoading(true);
    await axios
      .post(`${BASE_URL}/api/seller/become-seller/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSellerLoading(false);
      })
      .catch((error) => {
        setSellerLoading(false);
        ErrorToaster("Error", error?.response?.data?.message);
      });
  };
  return { BecomeSeller, sellerLoading };
}
export default useBecomeSeller;
