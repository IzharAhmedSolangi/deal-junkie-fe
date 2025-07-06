import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchReferralStats = async () => {
  const token = getAccessToken();
  const response = await axios.get(
    `${BASE_URL}/api/accounts/ambassador/dashboard/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

function useReferralStats() {
  const query = useQuery({
    queryKey: ["referral-stats"],
    queryFn: fetchReferralStats,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    refetchReferralStats: query.refetch,
  };
}

export default useReferralStats;
