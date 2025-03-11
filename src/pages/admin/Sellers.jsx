/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useGetAllSellers from "../../services/admin/useGetAllSellers";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import RatingStars from "../../components/shared/RatingStars";

function Sellers() {
  const { GetAllSellers, sellers } = useGetAllSellers();

  useEffect(() => {
    GetAllSellers();
  }, []);

  return (
    <>
      <div className="w-full h-auto p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[#02174C] text-[30px] font-[600]">Sellers</h1>
        </div>
        <div className="mt-3">
          {sellers.data && !sellers.loading && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {sellers.data?.map((item, index) => (
                <div
                  key={index}
                  className={` rounded-xl p-4 bg-white border-gray-200`}
                  style={{ boxShadow: "0px 0px 7px #49586D21" }}
                >
                  {item?.user?.profile_picture ? (
                    <img
                      src={item?.user?.profile_picture}
                      alt="Profile"
                      className="w-full h-[200px] object-cover rounded-sm"
                    />
                  ) : (
                    <svg
                      width="100%"
                      height="200"
                      viewBox="0 0 300 200"
                      xmlns="http://www.w3.org/2000/svg"
                      className="rounded-md"
                    >
                      <rect width="300" height="200" fill="#e0e0e0" />
                      <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="20"
                        fill="#777"
                      >
                        {item?.user?.first_name} {item?.user?.last_name}
                      </text>
                    </svg>
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

                  <button className="w-full bg-primary text-secondary py-2 rounded-sm cursor-pointer">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
          {sellers.data && sellers.loading && (
            <div className="w-full flex justify-center mt-2">
              <ButtonLoader3 />
            </div>
          )}
          {!sellers.data && sellers.loading && (
            <div className="flex justify-center items-center w-full h-[300px]">
              <ButtonLoader3 />
            </div>
          )}
          {!sellers.data && !sellers.loading && sellers.message && (
            <div className="flex justify-center items-center w-full h-[300px]">
              <ShowMessage title={sellers.message} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Sellers;
