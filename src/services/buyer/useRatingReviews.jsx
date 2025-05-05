import { useState } from "react";
import axios from "axios";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";
import { getAccessToken } from "../../storage/storage";

function useRatingReviews() {
  const token = getAccessToken();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [ratingResponse, setRatingResponse] = useState({
    loading: false,
    data: null,
    message: null,
  });

  const RatingReviews = async (orderId, payload, handleClose) => {
    setRatingResponse((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      message: null,
    }));
    await axios
      .post(
        `${BASE_URL}/api/buyer/accept-delivered-work/${orderId}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setRatingResponse((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: null,
        }));
        handleClose();
        SuccessToaster("Proposal Accepted", response?.data?.message);
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.message);
        setRatingResponse((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: null,
        }));
      });
  };
  return { RatingReviews, ratingResponse };
}
export default useRatingReviews;
