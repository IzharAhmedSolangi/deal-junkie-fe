import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchAllSellers = async ({ pageParam = 1, queryKey }) => {
  const [, params] = queryKey;
  const { search = "", filter = "" } = params;
  const token = getAccessToken();
  const response = await axios.get(
    `${BASE_URL}/api/admin/sellers/?page=${pageParam}&search=${search}&filter=${filter?.value}`,
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

function useGetAllSellers(filters) {
  const query = useInfiniteQuery({
    queryKey: ["all-sellers", filters],
    queryFn: fetchAllSellers,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page >= lastPage.totalPages) return undefined;
      return lastPage.nextPage;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    refetchAllSellers: query.refetch,
  };
}

export default useGetAllSellers;
