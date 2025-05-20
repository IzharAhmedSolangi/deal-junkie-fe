/* eslint-disable no-unused-vars */
import useGetAllBuyers from "../../services/admin/useGetAllBuyers";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import { MdOutlineMail, MdPhoneAndroid } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import AppHead from "../../seo/AppHead";
import { useCallback, useRef, useState } from "react";
import BuyerCard from "../../components/skeltons/BuyerCard";
import Dropdown from "../../components/shared/Dropdown";

function Buyers() {
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
    useGetAllBuyers(appliedFilters);

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

  const allBuyers = data?.pages?.flatMap((page) => page.data.results) || [];

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
      <AppHead title="Buyers - Deal Junkie" />
      <div className="w-full h-auto p-5">
        <div className="flex flex-col">
          <h1 className="text-[#02174C] text-[30px] font-[600]">Buyers</h1>
          <div className="flex items-center justify-between">
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
              className="w-[30%] h-[35px] rounded border border-[#02174C33] px-2 hover:border-secondary focus:border-secondary"
            />
            <div className="min-w-[150px]">
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
          {allBuyers && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {allBuyers?.map((item, index) => {
                const isLast = index === allBuyers.length - 1;
                return (
                  <div
                    key={index}
                    ref={isLast ? lastItemRef : null}
                    className={`rounded-lg p-4 bg-white border-gray-200`}
                    style={{ boxShadow: "0px 0px 7px #49586D21" }}
                  >
                    {item?.profile_picture ? (
                      <img
                        src={item?.profile_picture}
                        alt="Profile"
                        className="w-full md:h-[200px] xs:h-[120px] object-cover rounded-sm"
                      />
                    ) : (
                      <div className="w-full md:h-[200px] xs:h-[120px] bg-gray-200 rounded-sm flex justify-center items-center">
                        {item?.first_name}
                      </div>
                    )}
                    <h3 className="text-lg font-bold mt-2 text-[#022247] text-center">
                      {item?.first_name}
                    </h3>
                    {/* <div className="flex justify-center gap-1 mt-2">
                      <MdOutlineLocationOn className="text-[#6F7487] text-[20px]" />
                      <p className="font-normal text-[14px] text-[#6F7487] text-center">
                        {item?.street}
                        {item?.city && `, ${item?.city}`}
                        {item?.state && `, ${item?.state}`}
                      </p>
                    </div> */}
                    <div className="flex justify-center gap-1 mt-2">
                      <MdOutlineMail className="text-[#6F7487] text-[20px]flex-shrink-0" />
                      <p className="font-normal text-[14px] text-[#6F7487]">
                        {item?.email}
                      </p>
                    </div>
                    <div className="flex justify-center gap-1 mt-2">
                      <MdPhoneAndroid className="text-[#6F7487] text-[20px] flex-shrink-0" />
                      <p className="font-normal text-[14px] text-[#6F7487]">
                        {item?.phone_number}
                      </p>
                    </div>
                    <Link
                      to={`/admin/buyers/${item.id}`}
                      className="button-2 w-full bg-secondary text-white py-2 rounded-sm cursor-pointer mt-3 flex justify-center items-center"
                    >
                      View Details
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {allBuyers.length === 0 && !isLoading && (
            <div className="w-full h-[200px] flex justify-center items-center">
              <ShowMessage title="We didn't find any buyers" />
            </div>
          )}

          {isLoading && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <BuyerCard key={index} />
              ))}
            </div>
          )}

          {isFetchingNextPage && allBuyers && (
            <div className="w-full mt-3 flex justify-center">
              <ButtonLoader3 />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Buyers;
