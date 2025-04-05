/* eslint-disable react/prop-types */
import { CiCalendar, CiTimer } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { ButtonLoader3 } from "../../../../components/shared/ButtonLoaders";
import ShowMessage from "../../../../components/shared/ShowMessage";
import { MdOutlineMessage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import SendProposal from "../../../../components/modals/SendProposal";
import GlobalContext from "../../../../context/GlobalContext";
import { ErrorToaster } from "../../../../components/shared/Toster";
import { TruncateText } from "../../../../utils/TruncateText";
import JobCard from "../../../../components/skeltons/JobCard";

function FindJobsCard(props) {
  const { data, isLoading, isFetchingNextPage, lastItemRef } = props;
  const Navigate = useNavigate();
  const { userInfo } = useContext(GlobalContext);
  const [isOpenSendProposalModal, setIsOpenSendProposalModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(false);

  const allJobs = data?.pages?.flatMap((page) => page.data.results) || [];

  return (
    <>
      <div className="md:px-10 px-5">
        {!isLoading && allJobs.length > 0 && (
          <div className="mt-5">
            <h1 className="text-[#1D2939] text-[32px] font-[600]">
              Latest Jobs
            </h1>
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4 mt-1">
              {allJobs?.map((item, index) => {
                const isLast = index === allJobs.length - 1;
                return (
                  <div
                    key={index}
                    ref={isLast ? lastItemRef : null}
                    className="border border-[#15202712] rounded-[10px] shadow-md w-full h-auto md:p-3 p-2"
                  >
                    <div>
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
                    </div>
                    <h1 className="text-[#222222] md:text-[20px] text-[16px] font-[600] mt-3">
                      {item.title}
                    </h1>
                    <p className="text-[#98A2B3] md:text-[16px] text-[12px] mt-1">
                      {TruncateText(item.description)}
                    </p>
                    <div className="flex items-center gap-1 mt-3">
                      <button
                        className="bg-[#51B8EA0F] w-full h-[35px] border border-[#2D9ACF] rounded-sm text-[#2D9ACF] text-[13px] cursor-pointer flex justify-center items-center gap-1"
                        onClick={() => {
                          Navigate(`/find-jobs/${item.id}`);
                        }}
                      >
                        <IoEyeOutline />
                        See Details
                      </button>
                      <button
                        className="bg-[#00B75F0F] w-full h-[35px] border border-[#00B75F] rounded-sm text-[#00B75F] text-[13px] cursor-pointer flex justify-center items-center gap-1"
                        onClick={() => {
                          if (userInfo.seller_profile) {
                            setIsOpenSendProposalModal(true);
                            setSelectedJob(item);
                          } else {
                            ErrorToaster(
                              "Seller Profile",
                              "Complete your seller profile before applying any job"
                            );
                            Navigate("/dashboard/edit-profile");
                          }
                        }}
                      >
                        <MdOutlineMessage />
                        Send Request
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {allJobs.length === 0 && !isLoading && (
          <div className="w-full h-[200px] flex justify-center items-center">
            <ShowMessage title="We didn't find any jobs" />
          </div>
        )}

        {isLoading && (
          <div className="w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mt-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <JobCard key={index} />
            ))}
          </div>
        )}

        {isFetchingNextPage && allJobs && (
          <div className="w-full mt-3 flex justify-center">
            <ButtonLoader3 />
          </div>
        )}
      </div>
      <SendProposal
        selected={selectedJob}
        isOpenModal={isOpenSendProposalModal}
        setIsOpenModal={setIsOpenSendProposalModal}
      />
    </>
  );
}

export default FindJobsCard;
