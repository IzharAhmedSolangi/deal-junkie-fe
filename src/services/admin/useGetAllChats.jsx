import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchAllChats = async () => {
  const token = getAccessToken();
  const response = await axios.get(`${BASE_URL}/api/admin/admin/messages/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

function useGetAllChats() {
  const query = useQuery({
    queryKey: ["all-chats"],
    queryFn: fetchAllChats,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    refetchAllChats: query.refetch,
  };
}

export default useGetAllChats;
