/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useGetAllBuyers from "../../services/admin/useGetAllBuyers";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";

function Buyers() {
  const { GetAllBuyers, buyers } = useGetAllBuyers();

  useEffect(() => {
    GetAllBuyers();
  }, []);

  const handleLoadMore = () => {
    if (buyers.currentPage < buyers.totalPages) {
      const nextPage = buyers.currentPage + 1;
      GetAllBuyers(nextPage, true);
    }
  };
  return (
    <>
      <div className="w-full h-auto p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[#02174C] text-[30px] font-[600]">Buyers</h1>
        </div>
        <div className="mt-3">
          {buyers.data && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {buyers.data?.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-4 bg-white border-gray-200`}
                  style={{ boxShadow: "0px 0px 7px #49586D21" }}
                >
                  {item?.profile_picture ? (
                    <img
                      src={item?.profile_picture}
                      alt="Profile"
                      className="w-full md:h-[200px] h-[150px] object-cover rounded-sm"
                    />
                  ) : (
                    <div className="w-full md:h-[200px] h-[150px] bg-gray-200 rounded-sm flex justify-center items-center">
                      {item?.first_name} {item?.last_name}
                    </div>
                  )}
                  <h3 className="text-lg font-bold mt-2 text-[#022247] text-center">
                    {item?.first_name} {item?.last_name}
                  </h3>
                  <div className="flex justify-center gap-1 mt-2">
                    <MdOutlineLocationOn className="text-[#6F7487] text-[20px]" />
                    <p className="font-normal text-[14px] text-[#6F7487] text-center">
                      {item?.street}
                    </p>
                  </div>
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
                  <button className="w-full bg-secondary text-white py-2 rounded-sm cursor-pointer mt-3">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
          {buyers.currentPage < buyers.totalPages && !buyers.loading && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-primary text-secondary py-2 px-6 rounded-md cursor-pointer"
                onClick={handleLoadMore}
                disabled={buyers.loading}
              >
                See More
              </button>
            </div>
          )}
          {buyers.data && buyers.loading && (
            <div className="w-full flex justify-center mt-4">
              <ButtonLoader3 />
            </div>
          )}
          {!buyers.data && buyers.loading && (
            <div className="flex justify-center items-center w-full h-[300px]">
              <ButtonLoader3 />
            </div>
          )}
          {!buyers.data && !buyers.loading && buyers.message && (
            <div className="flex justify-center items-center w-full h-[300px]">
              <ShowMessage title={buyers.message} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Buyers;
