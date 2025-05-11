import useGetAllSellers from "../../services/admin/useGetAllSellers";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import RatingStars from "../../components/shared/RatingStars";
import { Link } from "react-router-dom";
import AppHead from "../../seo/AppHead";
import { useCallback, useRef } from "react";
import SellerCard from "../../components/skeltons/SellerCard";

function Sellers() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAllSellers();

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

  const allSellers = data?.pages?.flatMap((page) => page.data.results) || [];

  return (
    <>
      <AppHead title="Sellers - Deal Junkie" />
      <div className="w-full h-auto p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[#02174C] text-[30px] font-[600]">Sellers</h1>
        </div>
        <div className="mt-3">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {allSellers?.map((item, index) => {
              const isLast = index === allSellers.length - 1;
              return (
                <div
                  key={index}
                  ref={isLast ? lastItemRef : null}
                  className={` rounded-lg p-4 bg-white border-gray-200`}
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
                  <h3 className="text-lg font-bold mt-2 text-[#022247] text-center">
                    {item?.user?.first_name} {item?.user?.last_name}
                  </h3>
                  <div className="flex justify-center">
                    <p className="bg-[#F2F4F7] font-[500] text-[14px] text-secondary border border-secondary rounded-full py-1 px-2 ">
                      Starting from ${item?.rate_per_hour}
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-2 my-2">
                    <RatingStars rating={item?.rating || 0} totalReviews={0} />
                  </div>

                  <Link
                    to={`/admin/sellers/${item.id}`}
                    className="button-2 w-full bg-secondary text-white py-2 rounded-sm cursor-pointer mt-3 flex justify-center items-center"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>

          {allSellers.length === 0 && !isLoading && (
            <div className="w-full h-[200px] flex justify-center items-center">
              <ShowMessage title="We didn't find any sellers" />
            </div>
          )}

          {isLoading && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <SellerCard key={index} />
              ))}
            </div>
          )}

          {isFetchingNextPage && allSellers && (
            <div className="w-full mt-3 flex justify-center">
              <ButtonLoader3 />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Sellers;
