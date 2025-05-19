/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BuyerProfile from "./components/BuyerProfile";
import useGetBuyerById from "../../services/admin/useGetBuyerById ";
import {
  ButtonLoader3,
  ButtonLoader4,
} from "../../components/shared/ButtonLoaders";
import AppHead from "../../seo/AppHead";
import useCancelTask from "../../services/admin/useCancelTask";
import GlobalContext from "../../context/GlobalContext";
import { CiCalendar, CiTimer } from "react-icons/ci";
import { TruncateText } from "../../utils/TruncateText";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import RatingStars from "../../components/shared/RatingStars";
import ShowMessage from "../../components/shared/ShowMessage";

function BuyerDetails() {
  const { buyerId } = useParams();
  const [activeTab, setActiveTab] = useState("jobs");
  const { GetBuyerById, buyer } = useGetBuyerById();
  const { CancelTask, cancelTask } = useCancelTask();
  const { updateResponse } = useContext(GlobalContext);
  const [loadingTaskId, setLoadingTaskId] = useState(null);

  useEffect(() => {
    if (buyerId) {
      GetBuyerById(buyerId);
    }
  }, [buyerId, updateResponse]);

  const handleCancelJob = (taskId) => {
    CancelTask(taskId);
  };

  return (
    <>
      <AppHead title="Buyer Details - Deal Junkie" />
      <div className="w-full h-auto p-5">
        {!buyer.data && buyer.loading && (
          <div className="flex justify-center items-center w-full h-[300px]">
            <ButtonLoader3 />
          </div>
        )}
        {buyer.data && (
          <>
            <div className="flex items-center gap-1 mb-3">
              <Link
                to={"/admin/buyers"}
                className="text-[#02174C] hover:text-primary text-[18px] font-[500]"
              >
                Buyers
              </Link>
              /
              <p className="text-primary text-[18px] font-[500]">
                {buyer.data?.buyer_details?.first_name}
              </p>
            </div>
            <div className="w-full mt-3">
              <BuyerProfile buyer={buyer} />
            </div>
            <div className="flex border-b border-gray-200 mt-5">
              <button
                onClick={() => setActiveTab("jobs")}
                className={`flex-1 text-center py-2 font-medium cursor-pointer ${
                  activeTab === "jobs"
                    ? "text-primary border-b-2 border-primary"
                    : "text-[#667085] border-b-2 border-transparent"
                }`}
              >
                Jobs added by Buyer
              </button>
              <button
                onClick={() => setActiveTab("hired-sellers")}
                className={`flex-1 text-center py-2 font-medium cursor-pointer ${
                  activeTab === "hired-sellers"
                    ? "text-primary border-b-2 border-primary"
                    : "text-[#667085] border-b-2 border-transparent"
                }`}
              >
                Hired Seller
              </button>
            </div>
            {activeTab === "jobs" && (
              <>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mt-3">
                  {buyer.data?.posted_jobs?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-[#15202712] rounded-[10px] shadow-md w-full h-auto md:p-3 p-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                            <CiCalendar />
                            {item.expected_completion_date}
                          </div>
                          <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                            <CiTimer />
                            11:59 PM
                          </div>
                        </div>
                        {item.status === "Receiving Offer" && (
                          <div className="px-2 py-1 shadow-sm rounded-sm bg-secondary text-white text-[12px] font-[700]">
                            {item.status}
                          </div>
                        )}
                        {item.status === "In Progress" && (
                          <div className="px-2 py-1 shadow-sm rounded-sm bg-primary text-white text-[12px] font-[700]">
                            {item.status}
                          </div>
                        )}
                        {item.status === "Cancelled" && (
                          <div className="px-2 py-1 shadow-sm rounded-sm bg-[#D92D20] text-white text-[12px] font-[700]">
                            {item.status}
                          </div>
                        )}
                      </div>
                      <h1 className="text-[#222222] md:text-[20px] text-[16px] font-[600] mt-3">
                        {item.title}
                      </h1>
                      <p className="text-[#98A2B3] md:text-[16px] text-[12px] mt-1">
                        {TruncateText(item.description, 130)}
                      </p>
                      <div className="flex items-center gap-1 mt-3">
                        <Link
                          to={`/admin/jobs/${item.id}`}
                          className="bg-[#51B8EA0F] w-full h-[35px] border border-[#2D9ACF] rounded-sm text-[#2D9ACF] text-[13px] cursor-pointer flex justify-center items-center gap-1"
                        >
                          <IoEyeOutline />
                          See Details
                        </Link>
                        {item.status === "Receiving Offer" && (
                          <button
                            className="bg-[#EA51670F] w-full h-[35px] border border-[#EA5167] rounded-sm text-[#EA5167] text-[13px] cursor-pointer flex justify-center items-center gap-1"
                            disabled={cancelTask.loading}
                            onClick={() => {
                              setLoadingTaskId(item.id);
                              handleCancelJob(item.id);
                            }}
                          >
                            {cancelTask.loading && loadingTaskId === item.id ? (
                              <ButtonLoader4 />
                            ) : (
                              <>
                                <IoMdClose />
                                Cancel Job
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {buyer.data?.posted_jobs?.length === 0 && (
                  <div className="w-full h-[200px] flex justify-center items-center">
                    <ShowMessage title="We didn't find any jobs" />
                  </div>
                )}
              </>
            )}
            {activeTab === "hired-sellers" && (
              <>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-3">
                  {buyer.data?.hired_sellers?.map((item, index) => {
                    return (
                      <div
                        key={index}
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
                          <RatingStars
                            rating={item?.rating || 0}
                            totalReviews={0}
                          />
                        </div>

                        <Link
                          to={`/admin/sellers/${item.id}`}
                          className="w-full bg-secondary text-white py-2 rounded-sm cursor-pointer mt-3 flex justify-center items-center"
                        >
                          View Details
                        </Link>
                      </div>
                    );
                  })}
                </div>
                {buyer.data?.hired_sellers?.length === 0 && (
                  <div className="w-full h-[200px] flex justify-center items-center">
                    <ShowMessage title="We didn't find any hired sellers" />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default BuyerDetails;
