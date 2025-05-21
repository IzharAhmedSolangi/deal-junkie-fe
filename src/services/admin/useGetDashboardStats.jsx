import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchDashboardStats = async () => {
  const token = getAccessToken();
  const response = await axios.get(`${BASE_URL}/api/admin/summary-stats/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

function useGetDashboardStats() {
  const query = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    refetchDashboardStats: query.refetch,
  };
}

export default useGetDashboardStats;
