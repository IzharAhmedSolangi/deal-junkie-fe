import axios from "axios";
import { useState } from "react";
import { ErrorToaster } from "../../components/shared/Toster";
import { getAccessToken } from "../../storage/storage";

function useCreateZoomMeeting() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();
  const [meetingLoading, setMeetingLoading] = useState(false);
  const [meetingDetails, setMeetingInfo] = useState(null);

  const CreateMeeting = async () => {
    setMeetingLoading(true);
    await axios
      .get(`${BASE_URL}/api/accounts/create-zoom-meeting/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMeetingInfo(response.data);
        setMeetingLoading(false);
      })
      .catch((error) => {
        ErrorToaster("Error", error?.response?.data?.message);
        setMeetingLoading(false);
      });
  };
  return { CreateMeeting, meetingLoading, meetingDetails, setMeetingInfo };
}
export default useCreateZoomMeeting;
