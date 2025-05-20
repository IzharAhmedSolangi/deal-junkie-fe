/* eslint-disable no-unused-vars */
import useGetAllSellers from "../../services/admin/useGetAllSellers";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import RatingStars from "../../components/shared/RatingStars";
import { Link, useSearchParams } from "react-router-dom";
import AppHead from "../../seo/AppHead";
import { useCallback, useRef, useState } from "react";
import SellerCard from "../../components/skeltons/SellerCard";
import Dropdown from "../../components/shared/Dropdown";

function Sellers() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key, defaultValue) => {
    const value = searchParams.get(key);
    if (value === null) return defaultValue;

    if (typeof defaultValue === "object") {
      try {
        return JSON.parse(value);
      } catch (e) {
        return defaultValue;
      }
    }
    return value;
  };

  const [filters, setFilters] = useState({
    search: getParam("search", ""),
    filter: getParam("filter", { name: "All", value: "All" }),
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAllSellers(appliedFilters);

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

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    const params = {
      search: filters.search,
      filter: JSON.stringify(filters.filter),
    };
    setSearchParams(params);
  };

  return (
    <>
      <AppHead title="Sellers - Deal Junkie" />
      <div className="w-full h-auto p-5">
        <div className="flex flex-col">
          <h1 className="text-[#02174C] text-[30px] font-[600]">Sellers</h1>
          <div className="flex items-center justify-between gap-2">
            <input
              type="search"
              value={filters.search}
              onChange={(e) =>
                setFilters((prevState) => ({
                  ...prevState,
                  search: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  applyFilters();
                }
              }}
              placeholder="Search..."
              className="md:w-[30%] w-full h-[35px] rounded border border-[#02174C33] px-2 hover:border-secondary focus:border-secondary"
            />
            <div className="md:min-w-[150px] min-w-[120px]">
              <Dropdown
                placeholder="Select"
                options={[
                  { name: "All", value: "All" },
                  { name: "Blocked", value: "Blocked" },
                  { name: "Unblocked", value: "Unblocked" },
                ]}
                selected={filters.filter}
                onChange={(option) => {
                  const updatedFilters = {
                    ...filters,
                    filter: option,
                  };
                  setFilters(updatedFilters);
                  setAppliedFilters(updatedFilters);
                  setSearchParams({
                    search: updatedFilters.search,
                    filter: JSON.stringify(updatedFilters.filter),
                  });
                }}
              />
            </div>
          </div>
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
                      {item?.user?.first_name}
                    </div>
                  )}
                  <h3 className="text-lg font-bold mt-2 text-[#022247] text-center">
                    {item?.user?.first_name}
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
