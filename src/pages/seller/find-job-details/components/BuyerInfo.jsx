/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SendProposal from "../../../../components/modals/SendProposal";
import ReportUser from "../../../../components/modals/ReportUser";
import { ErrorToaster } from "../../../../components/shared/Toster";
import GlobalContext from "../../../../context/GlobalContext";

function BuyerInfo(props) {
  const { findJob } = props;
  const Navigate = useNavigate();
  const { userInfo } = useContext(GlobalContext);
  const [isOpenSendProposalModal, setIsOpenSendProposalModal] = useState(false);
  const [isOpenReportUserModal, setIsOpenReportUserModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(false);

  return (
    <>
      <div className="w-full p-5 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-[#222222] text-[16px] font-semibold mb-2">
            Customer details
          </h1>
          {findJob.data?.user?.profile_picture ? (
            <img
              src={findJob.data?.user?.profile_picture}
              alt=""
              className="w-[120px] h-[120px] object-cover rounded-full"
            />
          ) : (
            <svg
              className="w-[120px] h-[120px] rounded-full object-cover text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          )}
          <div className="flex gap-1 mt-2">
            <MdOutlineLocationOn className="text-[#6F7487] text-[20px]" />
            <p className="font-normal text-[14px] text-[#6F7487] text-center">
              {findJob.data?.user?.street}
            </p>
          </div>
          <div className="flex gap-1 mt-2">
            <MdOutlineMail className="text-[#6F7487] text-[20px]" />
            <p className="font-normal text-[14px] text-[#6F7487]">
              {findJob.data?.user?.email}
            </p>
          </div>
          <div className="flex gap-1 mt-2">
            <MdPhoneAndroid className="text-[#6F7487] text-[20px]" />
            <p className="font-normal text-[14px] text-[#6F7487]">
              {findJob.data?.user?.phone_number}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            className="w-full bg-secondary text-white py-2 rounded-sm cursor-pointer"
            onClick={() => {
              if (userInfo.seller_profile) {
                setIsOpenSendProposalModal(true);
                setSelectedJob(findJob.data);
              } else {
                ErrorToaster(
                  "Seller Profile",
                  "Complete your seller profile before applying any job"
                );
                Navigate("/dashboard/edit-profile");
              }
            }}
          >
            Send Request
          </button>
          <button
            className="w-full bg-primary text-secondary py-2 rounded-sm cursor-pointer"
            onClick={() => {
              Navigate(`/inbox?userId=${findJob.data?.user?.id}`);
            }}
          >
            Send Message
          </button>
        </div>
        <p
          className="text-gray-400 underline hover:text-primary text-center mt-4 font-[600] cursor-pointer"
          onClick={() => setIsOpenReportUserModal(true)}
        >
          Report User
        </p>
      </div>
      <SendProposal
        selected={selectedJob}
        isOpenModal={isOpenSendProposalModal}
        setIsOpenModal={setIsOpenSendProposalModal}
      />
      <ReportUser
        title="Tell us why are you reporting this user?"
        description="Select your reason for reporting and submit to us, we’ll look into this and take necessary actions."
        url={`/api/accounts/user/${findJob.data?.user?.id}/report/`}
        isOpenModal={isOpenReportUserModal}
        setIsOpenModal={setIsOpenReportUserModal}
      />
    </>
  );
}

export default BuyerInfo;
