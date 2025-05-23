/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Block from "../modals/Block";
import Unblock from "../modals/Unblock";

function SellerProfile(props) {
  const { seller } = props;
  const [isOpenBlockModal, setIsOpenBlockModal] = useState(false);
  const [isOpenUnblockModal, setIsOpenUnblockModal] = useState(false);

  return (
    <div className="w-full p-5 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-[#222222] text-[16px] font-semibold mb-2">
          Seller details
        </h1>
        {seller.data?.user?.profile_picture ? (
          <img
            src={seller.data?.user?.profile_picture}
            alt=""
            className="w-[120px] h-[120px] rounded-full"
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
        <div className="flex items-center gap-1 mt-2">
          <MdOutlineLocationOn className="text-[#6F7487] text-[20px] flex-shrink-0" />
          <p className="font-normal text-[14px] text-[#6F7487] text-center">
            {seller.data?.user?.street}
            {seller.data?.user?.city && `, ${seller.data?.user?.city}`}
            {seller.data?.user?.state && `, ${seller.data?.user?.state}`}
          </p>
        </div>
        <div className="flex justify-center gap-1 mt-2">
          <a
            href={seller.data?.user?.linkedin_link}
            target="_blank"
            rel="noferrer"
            className="font-normal text-[14px] text-[#6F7487] hover:underline hover:text-secondary"
          >
            {seller.data?.user?.linkedin_link}
          </a>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <MdOutlineMail className="text-[#6F7487] text-[20px] flex-shrink-0" />
          <p className="font-normal text-[14px] text-[#6F7487]">
            {seller.data?.user?.email}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <MdPhoneAndroid className="text-[#6F7487] text-[20px] flex-shrink-0" />
          <p className="font-normal text-[14px] text-[#6F7487]">
            {seller.data?.user?.phone_number}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        {seller.data?.user?.is_active ? (
          <button
            className="button-2 w-full bg-secondary text-white py-2 rounded-sm cursor-pointer"
            onClick={() => setIsOpenBlockModal(true)}
          >
            Block User
          </button>
        ) : (
          <button
            className="button-2 w-full bg-secondary text-white py-2 rounded-sm cursor-pointer"
            onClick={() => setIsOpenUnblockModal(true)}
          >
            Unblock User
          </button>
        )}

        <Link
          className="button-2 w-full bg-primary text-secondary py-2 rounded-sm cursor-pointer flex justify-center items-center"
          to={`/admin/inbox?userId=${seller.data?.user?.id}&username=${seller.data?.user?.first_name}`}
        >
          Send Message
        </Link>
      </div>

      <Block
        isOpenModal={isOpenBlockModal}
        setIsOpenModal={setIsOpenBlockModal}
        icon="/assets/icons/icon-3.png"
        title="Confirmation"
        description={`Are you sure you want to block ${seller.data?.user?.first_name}?`}
        userId={seller.data?.user?.id}
      />
      <Unblock
        isOpenModal={isOpenUnblockModal}
        setIsOpenModal={setIsOpenUnblockModal}
        icon="/assets/icons/icon-3.png"
        title="Confirmation"
        description={`Are you sure you want to unblock ${seller.data?.user?.first_name}?`}
        userId={seller.data?.user?.id}
      />
    </div>
  );
}

export default SellerProfile;
