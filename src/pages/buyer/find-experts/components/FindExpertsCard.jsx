/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { ButtonLoader3 } from "../../../../components/shared/ButtonLoaders";
import RatingStars from "../../../../components/shared/RatingStars";

function FindExpertsCard({ data, isLoading, isFetchingNextPage, lastItemRef }) {
  const navigate = useNavigate();
  const allExperts = data?.pages?.flatMap((page) => page.data.results) || [];

  return (
    <>
      {!isLoading && (
        <div className="mt-24">
          <h1 className="text-center md:text-[24px] text-[16px] text-secondary font-bold">
            We have {allExperts.length} results that match your details
          </h1>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 py-4 md:px-10 px-5">
            {allExperts.map((item, index) => {
              const isLast = index === allExperts.length - 1;
              return (
                <div
                  key={index}
                  ref={isLast ? lastItemRef : null}
                  className="rounded-xl p-4 bg-white border-gray-200"
                  style={{ boxShadow: "0px 0px 7px #49586D21" }}
                >
                  {item?.user?.profile_picture ? (
                    <img
                      src={item?.user?.profile_picture}
                      alt="Profile"
                      className="w-full md:h-[200px] xs:h-[120px] object-cover rounded-sm"
                    />
                  ) : (
                    <div className="w-full md:h-[200px] xs:h-[120px] bg-gray-200 rounded-sm flex justify-center items-center">
                      {item?.user?.first_name} {item?.user?.last_name}
                    </div>
                  )}
                  <h3 className="md:text-lg text-[14px] font-bold mt-2 text-[#022247] text-center">
                    {item?.user?.first_name} {item?.user?.last_name}
                  </h3>
                  <div className="flex justify-center md:mt-1 mt-1">
                    <p className="bg-[#F2F4F7] font-[500] md:text-[14px] text-[12px] text-secondary border border-secondary rounded-full md:py-1 py-[2px] md:px-2 px-1">
                      Starting from ${item?.rate_per_hour}
                    </p>
                  </div>
                  <div className="flex md:flex-row flex-col justify-center items-center md:gap-2 gap-[2px] my-2">
                    <RatingStars rating={item?.rating || 0} totalReviews={0} />
                  </div>
                  <div className="flex md:flex-row flex-col md:gap-2 gap-1 md:mt-6 mt-1">
                    <button className="w-full bg-secondary text-white md:py-2 py-1 rounded-sm cursor-pointer">
                      Hire Now
                    </button>
                    <button
                      className="w-full bg-primary text-secondary md:py-2 py-1 rounded-sm cursor-pointer"
                      onClick={() => navigate(`/find-experts/${item.id}`)}
                    >
                      See Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="w-full h-[300px] flex justify-center items-center">
          <ButtonLoader3 />
        </div>
      )}
      {isFetchingNextPage && allExperts && (
        <div className="w-full mt-3 flex justify-center">
          <ButtonLoader3 />
        </div>
      )}
    </>
  );
}

export default FindExpertsCard;
