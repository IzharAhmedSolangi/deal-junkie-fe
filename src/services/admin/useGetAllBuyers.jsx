import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchAllBuyers = async ({ pageParam = 1, queryKey }) => {
  const [, params] = queryKey;
  const { search = "", filter = "" } = params;
  const token = getAccessToken();
  const response = await axios.get(
    `${BASE_URL}/api/admin/buyers/?page=${pageParam}&search=${search}&filter=${filter?.value}`,
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

function useGetAllBuyers(filters) {
  const query = useInfiniteQuery({
    queryKey: ["all-buyers", filters],
    queryFn: fetchAllBuyers,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page >= lastPage.totalPages) return undefined;
      return lastPage.nextPage;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    refetchAllBuyers: query.refetch,
  };
}

export default useGetAllBuyers;
