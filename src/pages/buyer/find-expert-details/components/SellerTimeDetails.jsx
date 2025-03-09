import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";

function SellerTimeDetails() {
  return (
    <div className="w-full p-5 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-[#222222] text-[16px] font-semibold mb-2">
          Seller details
        </h1>
        <svg
          className="w-[120px] h-[120px] text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="flex gap-1 mt-2">
          <MdOutlineLocationOn className="text-[#6F7487] text-[20px]" />
          <p className="font-normal text-[14px] text-[#6F7487] text-center">
            3401 Walnut St, Philadelphia 19104, Pennsylvania, United States
          </p>
        </div>
        <div className="flex gap-1 mt-2">
          <MdOutlineMail className="text-[#6F7487] text-[20px]" />
          <p className="font-normal text-[14px] text-[#6F7487]">
            sarahtaylor0426@gmail.com
          </p>
        </div>
        <div className="flex gap-1 mt-2">
          <MdPhoneAndroid className="text-[#6F7487] text-[20px]" />
          <p className="font-normal text-[14px] text-[#6F7487]">232-455-0426</p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-400 pt-4">
        <h3 className="text-lg font-semibold">Working Hours</h3>
        <ul className="mt-2 text-gray-400 text-[14px]">
          <div className="flex justify-between items-center">
            <li>Sunday </li>
            <li>5:00 PM - 8:00 PM</li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li>Monday </li>
            <li>5:00 PM - 8:00 PM</li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li>Tuesday </li>
            <li>5:00 PM - 8:00 PM</li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li>Wednesday </li>
            <li>5:00 PM - 8:00 PM</li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li>Thursday </li>
            <li>5:00 PM - 8:00 PM</li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li>Friday</li>
            <li>5:00 PM - 8:00 PM</li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li>Saturday </li>
            <li>5:00 PM - 8:00 PM</li>
          </div>
        </ul>
      </div>

      <div className="flex gap-2 mt-6">
        <button className="w-full bg-secondary text-white py-2 rounded">
          Hire Now
        </button>
        <button className="w-full bg-primary text-secondary py-2 rounded">
          Send Message
        </button>
      </div>
      <p className="text-gray-400 underline text-center mt-4 font-[600] cursor-pointer">
        Report User
      </p>
    </div>
  );
}

export default SellerTimeDetails;
