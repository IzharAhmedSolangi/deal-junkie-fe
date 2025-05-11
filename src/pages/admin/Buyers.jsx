import useGetAllBuyers from "../../services/admin/useGetAllBuyers";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";
import { Link } from "react-router-dom";
import AppHead from "../../seo/AppHead";
import { useCallback, useRef } from "react";
import BuyerCard from "../../components/skeltons/BuyerCard";

function Buyers() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAllBuyers();

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
  return (
    <>
      <AppHead title="Buyers - Deal Junkie" />
      <div className="w-full h-auto p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[#02174C] text-[30px] font-[600]">Buyers</h1>
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
                        {item?.first_name} {item?.last_name}
                      </div>
                    )}
                    <h3 className="text-lg font-bold mt-2 text-[#022247] text-center">
                      {item?.first_name} {item?.last_name}
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
                      <MdOutlineMail className="text-[#6F7487] text-[20px]" />
                      <p className="font-normal text-[14px] text-[#6F7487]">
                        {item?.email}
                      </p>
                    </div>
                    <div className="flex justify-center gap-1 mt-2">
                      <MdPhoneAndroid className="text-[#6F7487] text-[20px]" />
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
