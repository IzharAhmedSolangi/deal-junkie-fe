/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { ButtonLoader3 } from "../../../../components/shared/ButtonLoaders";
import ShowMessage from "../../../../components/shared/ShowMessage";
import RatingStars from "../../../../components/shared/RatingStars";

function FindExpertsCard(props) {
  const { findExperts } = props;
  const Navigate = useNavigate();

  return (
    <>
      {!findExperts.data && !findExperts.loading && findExperts.showInitial && (
        <div className="flex justify-center mt-24">
          <img src="/assets/images/image-4.png" alt="" />
        </div>
      )}
      {!findExperts.data &&
        !findExperts.loading &&
        !findExperts.showInitial &&
        findExperts.message && (
          <div className="flex justify-center mt-24 mb-10">
            <ShowMessage title={findExperts.message} />
          </div>
        )}
      {findExperts.data && !findExperts.loading && (
        <div className="mt-24">
          <h1 className="text-center text-[24px] text-secondary font-bold">
            We have {findExperts.data?.length} results for that matches your
            details
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 py-4 px-10">
            {findExperts.data?.map((item, index) => (
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
                {/* <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {["TaxPlanning", "Advisor", "WealthAdvisor"].map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#F2F4F7] text-secondary text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div> */}
                <div className="flex gap-2 mt-6">
                  <button className="w-full bg-secondary text-white py-2 rounded-sm cursor-pointer">
                    Hire Now
                  </button>
                  <button
                    className="w-full bg-primary text-secondary py-2 rounded-sm cursor-pointer"
                    onClick={() => {
                      Navigate(`/find-experts/${item.id}`);
                    }}
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {findExperts.loading && (
        <div className="flex justify-center mt-3">
          <ButtonLoader3 />
        </div>
      )}
    </>
  );
}

export default FindExpertsCard;
