/* eslint-disable react/prop-types */

import { useContext } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import GlobalContext from "../../../context/GlobalContext";

const Navbar = (props) => {
  const { toggleSidebar } = props;
  const { userInfo } = useContext(GlobalContext);

  return (
    <>
      <div className="w-full h-[70px] bg-white shadow-sm px-5 flex justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="lg:hidden flex">
            <MdOutlineMenu
              onClick={toggleSidebar}
              className="text-[30px] text-[#788BA5] hover:text-primary cursor-pointer"
            />
          </div>
          <h1 className="text-secondary font-semibold md:text-[20px] text-[15px]">
            Welcome, {userInfo?.user?.first_name} {userInfo?.user?.last_name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <svg
              className="w-10 h-10 text-gray-300 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div>
              <h1 className="text-secondary font-semibold text-[14px]">
                {userInfo?.user?.first_name} {userInfo?.user?.last_name}
              </h1>
              <p className="text-[#5F5B5B] font-normal text-[12px]">
                {userInfo?.user?.email}
              </p>
            </div>
            <IoMdArrowDropdown className="text-[25px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
