import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "../../storage/storage";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchReviews = async ({ pageParam = 1, sellerId }) => {
  const token = getAccessToken();
  const response = await axios.get(
    `${BASE_URL}/api/buyer/seller/${sellerId}/reviews/?page=${pageParam}`,
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

function useGetReviews(sellerId) {
  const query = useInfiniteQuery({
    queryKey: ["reviews", sellerId],
    queryFn: ({ pageParam = 1 }) => fetchReviews({ pageParam, sellerId }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.current_page >= lastPage.totalPages) return undefined;
      return lastPage.nextPage;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!sellerId,
  });

  return {
    ...query,
    refetchReviews: query.refetch,
  };
}

export default useGetReviews;
