import { CiUser } from "react-icons/ci";
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";
import { Link } from "react-router-dom";

function buyerProfile(props) {
  const { buyer } = props;

  return (
    <div className="w-full p-5 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col">
        <h1 className="text-[#222222] text-[16px] font-semibold mb-2">
          Buyer details
        </h1>
        <div className="flex items-center gap-5 mt-2">
          {buyer.data?.buyer_details?.profile_picture ? (
            <img
              src={buyer.data?.buyer_details?.profile_picture}
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
          <div>
            <div className="flex gap-1 mt-2">
              <CiUser className="text-[#6F7487] text-[20px]" />
              <p className="font-normal text-[14px] text-[#6F7487] text-center">
                {buyer.data?.buyer_details?.first_name}{" "}
                {buyer.data?.buyer_details?.last_name}
              </p>
            </div>
            <div className="flex gap-1 mt-2">
              <MdOutlineLocationOn className="text-[#6F7487] text-[20px]" />
              <p className="font-normal text-[14px] text-[#6F7487] text-center">
                {buyer.data?.buyer_details?.street}
                {buyer.data?.buyer_details?.city &&
                  `, ${buyer.data?.buyer_details?.city}`}
                {buyer.data?.buyer_details?.city &&
                  `, ${buyer.data?.buyer_details?.state}`}
              </p>
            </div>
            <div className="flex gap-1 mt-2">
              <MdOutlineMail className="text-[#6F7487] text-[20px]" />
              <p className="font-normal text-[14px] text-[#6F7487]">
                {buyer.data?.buyer_details?.email}
              </p>
            </div>
            <div className="flex gap-1 mt-2">
              <MdPhoneAndroid className="text-[#6F7487] text-[20px]" />
              <p className="font-normal text-[14px] text-[#6F7487]">
                {buyer.data?.buyer_details?.phone_number}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button className="button-2 w-full bg-secondary text-white py-2 rounded-sm cursor-pointer">
          Block User
        </button>
        <Link
          className="button-2 w-full bg-primary text-secondary py-2 rounded-sm cursor-pointer flex justify-center items-center"
          to={`/admin/inbox?userId=${buyer.data?.buyer_details?.id}&username=${
            buyer.data?.buyer_details?.first_name
          }${" "}${buyer.data?.buyer_details?.last_name}`}
        >
          Send Message
        </Link>
      </div>
    </div>
  );
}

export default buyerProfile;
