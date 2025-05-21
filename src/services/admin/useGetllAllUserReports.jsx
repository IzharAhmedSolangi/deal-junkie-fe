import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchAllUserReports = async ({ pageParam = 1 }) => {
  const token = getAccessToken();
  const response = await axios.get(
    `${BASE_URL}/api/admin/user-reports/?page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data;
  return {
    data,
    nextPage: data.current_page + 1,
    totalPages: data.total_pages,
  };
};

function useGetllAllUserReports() {
  const query = useInfiniteQuery({
    queryKey: ["all-user-reports"],
    queryFn: fetchAllUserReports,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page >= lastPage.totalPages) return undefined;
      return lastPage.nextPage;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    refetchAllUserReports: query.refetch,
  };
}

export default useGetllAllUserReports;
