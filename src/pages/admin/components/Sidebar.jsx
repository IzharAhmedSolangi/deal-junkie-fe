/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiBagBold } from "react-icons/pi";
import { CgFileDocument } from "react-icons/cg";
import { LuHandCoins } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { GoReport } from "react-icons/go";

import {
  removeAccessToken,
  removeRefreshToken,
} from "../../../storage/storage";

const sidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    id: 2,
    name: "Jobs",
    href: "/admin/jobs",
    icon: <PiBagBold />,
  },
  {
    id: 3,
    name: "Earnings",
    href: "/admin/earnings",
    icon: <CgFileDocument />,
  },
  {
    id: 4,
    name: "Buyers",
    href: "/admin/buyers",
    icon: <LuHandCoins />,
  },
  {
    id: 5,
    name: "Sellers",
    href: "/admin/sellers",
    icon: <FiUser />,
  },
  {
    id: 7,
    name: "Chats",
    href: "/admin/chats",
    icon: <IoChatbubbleEllipsesOutline />,
  },
  {
    id: 7,
    name: "Support Messages",
    href: "/admin/support-messages",
    icon: <BiMessageSquareDetail />,
  },
  {
    id: 8,
    name: "User Reports",
    href: "/admin/user-reports",
    icon: <GoReport />,
  },
];

function Sidebar(props) {
  const { setIsSidebarOpen } = props;
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = async () => {
    removeAccessToken();
    removeRefreshToken();
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col w-full h-full bg-white border-r border-r-[#E2E2EA]">
      <div className="flex flex-col items-start">
        <Link
          to="/admin/dashboard"
          className="flex items-center justify-center gap-1 text-[24px] font-extrabold w-full h-[70px]"
        >
          <img src="/assets/logo/logo.png" alt="Logo" />
          <h1 className="text-2xl font-extrabold text-[#003F63]">
            Deal Junkie
          </h1>
        </Link>
        <div className="w-full">
          {sidebarItems.map((data, index) => (
            <Link
              onClick={() => setIsSidebarOpen(false)}
              to={data.href}
              key={index}
              className={`hover:bg-primary hover:text-white font-medium text-[14px] ${
                currentPath.includes(data.href)
                  ? "bg-primary text-[#FCFCFD]"
                  : "text-[#18417E]"
              }   py-3 px-4 flex gap-2 items-center w-full`}
            >
              <p className="text-[20px]">{data.icon}</p>
              {data.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-end h-full">
        <button
          onClick={handleLogout}
          className="flex items-center text-[#ED1C24] gap-3 hover:bg-[#ED1C24] cursor-pointer hover:text-white py-3 px-4"
        >
          <IoLogOutOutline className="text-[20px]" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
