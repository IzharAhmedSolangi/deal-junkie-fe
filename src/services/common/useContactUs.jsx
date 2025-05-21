/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { ErrorToaster, SuccessToaster } from "../../components/shared/Toster";

function useContactUs() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const ContactUs = async (payload, resetForm) => {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/api/accounts/contact-us/`, payload)
      .then((response) => {
        SuccessToaster("Message Sent", "Your message successfully sent!");
        resetForm();
        setLoading(false);
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.message);
        setLoading(false);
      });
  };
  return { ContactUs, loading };
}
export default useContactUs;
