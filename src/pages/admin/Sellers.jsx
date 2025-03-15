/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useGetAllSellers from "../../services/admin/useGetAllSellers";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import RatingStars from "../../components/shared/RatingStars";
import { Link } from "react-router-dom";

function Sellers() {
  const { GetAllSellers, sellers } = useGetAllSellers();

  useEffect(() => {
    GetAllSellers();
  }, []);

  const handleLoadMore = () => {
    if (sellers.currentPage < sellers.totalPages) {
      const nextPage = sellers.currentPage + 1;
      GetAllSellers(nextPage, true);
    }
  };

  return (
    <>
      <div className="w-full h-auto p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[#02174C] text-[30px] font-[600]">Sellers</h1>
        </div>
        <div className="mt-3">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {sellers.data?.map((item, index) => (
              <div
                key={index}
                className={` rounded-lg p-4 bg-white border-gray-200`}
                style={{ boxShadow: "0px 0px 7px #49586D21" }}
              >
                {item?.user?.profile_picture ? (
                  <img
                    src={item?.user?.profile_picture}
                    alt="Profile"
                    className="w-full h-[200px] object-cover rounded-sm"
                  />
                ) : (
                  <div className="w-full md:h-[200px] h-[150px] bg-gray-200 rounded-sm flex justify-center items-center">
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
                  className="w-full bg-secondary text-white py-2 rounded-sm cursor-pointer mt-3 flex justify-center items-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
          {sellers.currentPage < sellers.totalPages && !sellers.loading && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-primary text-secondary py-2 px-6 rounded-md cursor-pointer"
                onClick={handleLoadMore}
                disabled={sellers.loading}
              >
                See More
              </button>
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
          {!sellers.loading && sellers.message && (
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
