/* eslint-disable react/prop-types */
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";
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
            <MdOutlineLocationOn className="text-[#6F7487] text-[20px]" />
            <p className="font-normal text-[14px] text-[#6F7487] text-center">
              {findExpert.data?.user?.street}
            </p>
          </div>
          <div className="flex gap-1 mt-2">
            <MdOutlineMail className="text-[#6F7487] text-[20px]" />
            <p className="font-normal text-[14px] text-[#6F7487]">
              {findExpert.data?.user?.email}
            </p>
          </div>
          <div className="flex gap-1 mt-2">
            <MdPhoneAndroid className="text-[#6F7487] text-[20px]" />
            <p className="font-normal text-[14px] text-[#6F7487]">
              {findExpert.data?.user?.phone_number}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-400 pt-4">
          <h3 className="text-lg font-semibold">Working Hours</h3>
          {findExpert.data?.working_hours ? (
            <ul className="mt-2 text-gray-400 text-[14px] mb-6">
              {findExpert.data?.working_hours?.monday_available && (
                <div className="flex justify-between items-center mt-2">
                  <li>Monday</li>
                  <li>
                    {findExpert.data?.working_hours?.monday_start} -{" "}
                    {findExpert.data?.working_hours?.monday_close}
                  </li>
                </div>
              )}
              {findExpert.data?.working_hours?.tuesday_available && (
                <div className="flex justify-between items-center mt-2">
                  <li>Tuesday</li>
                  <li>
                    {findExpert.data?.working_hours?.tuesday_start} -{" "}
                    {findExpert.data?.working_hours?.tuesday_close}
                  </li>
                </div>
              )}
              {findExpert.data?.working_hours?.wednesday_available && (
                <div className="flex justify-between items-center mt-2">
                  <li>Wednesday</li>
                  <li>
                    {findExpert.data?.working_hours?.wednesday_start} -{" "}
                    {findExpert.data?.working_hours?.wednesday_close}
                  </li>
                </div>
              )}
              {findExpert.data?.working_hours?.thursday_available && (
                <div className="flex justify-between items-center mt-2">
                  <li>Thursday</li>
                  <li>
                    {findExpert.data?.working_hours?.thursday_start} -{" "}
                    {findExpert.data?.working_hours?.thursday_close}
                  </li>
                </div>
              )}
              {findExpert.data?.working_hours?.friday_available && (
                <div className="flex justify-between items-center mt-2">
                  <li>Friday</li>
                  <li>
                    {findExpert.data?.working_hours?.friday_start} -{" "}
                    {findExpert.data?.working_hours?.friday_close}
                  </li>
                </div>
              )}
              {findExpert.data?.working_hours?.saturday_available && (
                <div className="flex justify-between items-center mt-2">
                  <li>Saturday</li>
                  <li>
                    {findExpert.data?.working_hours?.saturday_start} -{" "}
                    {findExpert.data?.working_hours?.saturday_close}
                  </li>
                </div>
              )}
              {findExpert.data?.working_hours?.sunday_available && (
                <div className="flex justify-between items-center mt-2">
                  <li>Sunday</li>
                  <li>
                    {findExpert.data?.working_hours?.sunday_start} -{" "}
                    {findExpert.data?.working_hours?.sunday_close}
                  </li>
                </div>
              )}
            </ul>
          ) : (
            <p className="h-[100px] text-gray-400 text-[14px] flex justify-center items-center">
              Seller didn&apos;t set working hours
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            className="w-full bg-secondary text-white py-2 rounded-sm cursor-pointer hover:opacity-80"
            onClick={() => {
              setIsOpenHireNowModal(true);
              setSelectedSeller(findExpert.data);
            }}
          >
            Hire Now
          </button>
          <Link
            className="w-full bg-primary text-secondary py-2 rounded-sm cursor-pointer flex justify-center items-center hover:opacity-80"
            to={`/inbox?userId=${findExpert.data?.user?.id}`}
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
        url={`/api/accounts/user/${findExpert.data?.user?.id}/report/`}
        isOpenModal={isOpenReportUserModal}
        setIsOpenModal={setIsOpenReportUserModal}
      />
    </>
  );
}

export default SellerTimeDetails;
