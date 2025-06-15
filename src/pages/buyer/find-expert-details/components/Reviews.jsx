/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import Dropdown from "../../../../components/shared/Dropdown";
import RatingStars from "../../../../components/shared/RatingStars";
import useGetReviews from "../../../../services/buyer/useGetReviews";
import { FormatDateAndTime } from "../../../../utils/FormatDate";

const Reviews = (props) => {
  const { sellerId } = props;
  const [selectedFilter, setSelectedFilter] = useState({
    name: "Most Relevant",
    value: "most-relevant",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetReviews(sellerId);

  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const reviews = data?.pages?.flatMap((page) => page.data.results) || [];
  const ratingDistribution = data?.pages[0]?.data?.rating_distribution;
  const totalReviews = data?.pages[0]?.data?.total_reviews;
  const totalRating = data?.pages[0]?.data?.avg_rating;

  return (
    <>
      {reviews.length > 0 && (
        <div className="w-full bg-white mt-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-start mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Reviews
              </h2>
              <div className="flex flex-col gap-4">
                <div className="text-5xl font-bold text-green-400">
                  {totalRating ? totalRating.toFixed(1) : "0.0"}
                </div>
                <div className="flex gap-2 items-center">
                  <RatingStars
                    rating={totalRating || 0}
                    totalReviews={totalReviews || 0}
                  />
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-2 text-sm">
                  <span className="w-2 text-gray-600 font-bold">{stars}</span>
                  <div className="w-[220px] h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-400 rounded-full"
                      style={{ width: `${ratingDistribution[stars] || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-end mb-6">
            <div className="md:min-w-[200px] min-w-[200px]">
              <Dropdown
                placeholder="Select"
                options={[
                  { name: "Most Relevant", value: "most-relevant" },
                  { name: "Most Recent", value: "most-recent" },
                ]}
                selected={selectedFilter}
                onChange={(option) => {
                  setSelectedFilter(option);
                }}
              />
            </div>
          </div>

          {/* Reviews List */}
          <div className="flex flex-col gap-5">
            {reviews.map((item, index) => {
              const isLast = index === reviews.length - 1;

              return (
                <div
                  key={index}
                  ref={isLast ? lastItemRef : null}
                  className="border-b border-gray-200 pb-6"
                >
                  <div className="flex items-start gap-4">
                    {item.buyer_profile_pic ? (
                      <img
                        src={item.buyer_profile_pic}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-12 h-12 rounded-full text-gray-200 dark:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {item.buyer_username}
                        </h3>
                        <span className="text-gray-500 text-sm">
                          {FormatDateAndTime(item.created_at)}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <RatingStars
                          rating={item?.rating || 0}
                          totalReviews={0}
                          isShowTotalReviews={false}
                        />
                      </div>
                      <p className="text-gray-700 mt-3 leading-relaxed">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Reviews;
