import { useState } from "react";
import axios from "axios";

function useRatingReviews() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [ratingResponse, setRatingResponse] = useState({
    loading: false,
    data: null,
    message: null
  });

  const RatingReviews = async (payload, handleClose) => {
    setRatingResponse((prevState) => ({
      ...prevState,
      loading: true,
      data: null,
      message: null
    }));
    await axios
      .post(`${BASE_URL}/api/accounts/login/`, payload)
      .then((response) => {
        setRatingResponse((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: null
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
          message: null
        }));
      });
  };
  return { RatingReviews, ratingResponse };
}
export default useRatingReviews;
