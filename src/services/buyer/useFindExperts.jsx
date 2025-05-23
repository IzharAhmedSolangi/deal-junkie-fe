/* eslint-disable no-unused-vars */
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchExperts = async ({ pageParam = 1, queryKey }) => {
  const [_, filters] = queryKey;
  const token = getAccessToken();
  const response = await axios.post(
    `${BASE_URL}/api/seller/get-sellers/?page=${pageParam}`,
    filters,
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

function useFindExperts(filters) {
  const query = useInfiniteQuery({
    queryKey: ["find-experts", filters],
    queryFn: fetchExperts,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page >= lastPage.totalPages) return undefined;
      return lastPage.nextPage;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    refetchExperts: query.refetch,
  };
}

export default useFindExperts;
