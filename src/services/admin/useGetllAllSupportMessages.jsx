import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchAllSupportMessages = async () => {
  const token = getAccessToken();
  const response = await axios.get(
    `${BASE_URL}/api/admin/admin/support-messages/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

function useGetllAllSupportMessages() {
  const query = useQuery({
    queryKey: ["all-support-messages"],
    queryFn: fetchAllSupportMessages,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    refetchAllSupportMessages: query.refetch,
  };
}

export default useGetllAllSupportMessages;
