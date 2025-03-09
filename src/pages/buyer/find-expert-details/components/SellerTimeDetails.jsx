import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
function SellerTimeDetails() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex flex-col items-center">
        <img
          src="/assets/images/image-2.png"
          alt="Sarah Taylor"
          className="w-24 h-24 rounded-full  mb-4 border border-gray-300"
        />
        <p className=" flex gap-2">
          <FaMapMarkerAlt className="text-gray-400 mt-1" />
          <p className="items-center text-gray-400 text-[14px]">
            3401 Walnut St, Philadelphia 19104, Pennsylvania, United States
          </p>
        </p>
        <p className="flex gap-2 mt-2">
          <FaEnvelope className="text-gray-400 mt-1" />
          <p className="items-center text-gray-400 text-[14px]">
            sarah.taylor0426@gmail.com
          </p>
        </p>
        <p className=" flex  gap-2 mt-2">
          <FaPhoneAlt className="text-gray-400 mt-1" />
          <p className="items-center text-gray-400 text-[14px]">
            (232) 455-0426
          </p>
        </p>
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
        <button className="w-full bg-green-500 text-white py-2 rounded">
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
