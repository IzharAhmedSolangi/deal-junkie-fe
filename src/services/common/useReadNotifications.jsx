import axios from "axios";
import { getAccessToken } from "../../storage/storage";

function useReadNotifications() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = getAccessToken();

  const ReadNotifications = async () => {
    await axios
      .post(
        `${BASE_URL}/api/accounts/read-notifications/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {});
  };
  return { ReadNotifications };
}
export default useReadNotifications;
