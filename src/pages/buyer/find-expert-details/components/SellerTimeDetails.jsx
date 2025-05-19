/* eslint-disable react/prop-types */
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import HireNow from "../../../../components/modals/HireNow";
import { useState } from "react";
import ReportUser from "../../../../components/modals/ReportUser";

function SellerTimeDetails(props) {
  const { findExpert } = props;
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isOpenHireNowModal, setIsOpenHireNowModal] = useState(false);
  const [isOpenReportUserModal, setIsOpenReportUserModal] = useState(false);

  return (
    <>
      <div className="w-full p-5 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-[#222222] text-[16px] font-semibold mb-2">
            Seller details
          </h1>
          {findExpert.data?.user?.profile_picture ? (
            <img
              src={findExpert.data?.user?.profile_picture}
              alt=""
              className="w-[120px] h-[120px] object-cover rounded-full"
            />
          ) : (
            <svg
              className="w-[120px] h-[120px] rounded-full text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          )}
          <div className="flex gap-1 mt-2">
            <MdOutlineLocationOn className="text-[#6F7487] text-[20px] flex-shrink-0" />
            <p className="font-normal text-[14px] text-[#6F7487] text-center">
              {findExpert.data?.user?.street}
              {findExpert.data?.user?.city &&
                `, ${findExpert.data?.user?.city}`}
              {findExpert.data?.user?.state &&
                `, ${findExpert.data?.user?.state}`}
            </p>
          </div>
          <div className="flex gap-1 mt-2">
            <FaLinkedin className="text-[#6F7487] text-[20px] flex-shrink-0" />
            <a
              href={findExpert.data?.user?.linkedin_link}
              target="_blank"
              rel="noferrer"
              className="font-normal text-[14px] text-[#6F7487] hover:underline hover:text-secondary"
            >
              {findExpert.data?.user?.linkedin_link}
            </a>
          </div>
          <div className="flex gap-1 mt-2">
            <MdOutlineMail className="text-[#6F7487] text-[20px] flex-shrink-0" />
            <p className="font-normal text-[14px] text-[#6F7487]">
              {findExpert.data?.user?.email}
            </p>
          </div>
          <div className="flex gap-1 mt-2">
            <MdPhoneAndroid className="text-[#6F7487] text-[20px] flex-shrink-0" />
            <p className="font-normal text-[14px] text-[#6F7487]">
              {findExpert.data?.user?.phone_number}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            className="button-2 w-full bg-secondary text-white py-2 rounded-sm cursor-pointer"
            onClick={() => {
              setIsOpenHireNowModal(true);
              setSelectedSeller(findExpert.data);
            }}
          >
            Hire Now
          </button>
          <Link
            className="button-2 w-full bg-primary text-secondary py-2 rounded-sm cursor-pointer flex justify-center items-center"
            to={`/inbox?userId=${findExpert.data?.user?.id}&username=${findExpert.data?.user?.first_name}`}
          >
            Send Message
          </Link>
        </div>
        <p
          className="text-gray-400 hover:text-primary underline text-center mt-4 font-[600] cursor-pointer"
          onClick={() => setIsOpenReportUserModal(true)}
        >
          Report User
        </p>
      </div>
      <HireNow
        isOpenModal={isOpenHireNowModal}
        setIsOpenModal={setIsOpenHireNowModal}
        selectedSeller={selectedSeller}
      />
      <ReportUser
        title="Tell us why are you reporting this user?"
        description="Select your reason for reporting and submit to us, we’ll look into this and take necessary actions."
        reportedUser={findExpert.data?.user?.id}
        isOpenModal={isOpenReportUserModal}
        setIsOpenModal={setIsOpenReportUserModal}
      />
    </>
  );
}

export default SellerTimeDetails;
