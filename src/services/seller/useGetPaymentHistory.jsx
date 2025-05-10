import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useGetPaymentHistory() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [paymentHistory, setPaymentHistory] = useState({
    loading: true,
    data: null,
    message: null,
  });

  const GetPaymentHistory = async () => {
    await axios
      .get(`${BASE_URL}/api/seller/my-transactions/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPaymentHistory((prevState) => ({
          ...prevState,
          loading: false,
          totalPages: response.data.total_pages,
          currentPage: response.data.current_page,
          data: response.data.results,
          message:
            response.data.results.length > 0 ? null : "We didn't find any jobs",
        }));
      })
      .catch((error) => {
        setPaymentHistory((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  return { GetPaymentHistory, paymentHistory, setPaymentHistory };
}
export default useGetPaymentHistory;
