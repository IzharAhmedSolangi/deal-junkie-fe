import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BsClipboardCheck, BsCreditCard2Front } from "react-icons/bs";
import { IoIosSwitch } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";

import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from "../../storage/storage";
import Auth from "../modals/Auth";
import PostProject from "../modals/PostProject";
import useEditProfile from "../../services/common/useEditProfile";
import { LuLayoutDashboard } from "react-icons/lu";
import Notifications from "./Notifications";

const Navbar = () => {
  const token = getAccessToken();
  const location = useLocation();
  const { userInfo } = useContext(GlobalContext);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState(null);
  const [isOpenPostProjectModal, setIsOpenPostProjectModal] = useState(false);

  const [isScrolled, setIsScrolled] = useState(null);
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`bg-transparent w-full h-[60px] fixed top-0 xs:hidden lg:flex justify-between items-center px-5 z-50 ${
          isScrolled ? "bg-white shadow-2xl" : ""
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-1 text-[24px] font-extrabold w-[20%]"
        >
          <img src="/assets/logo/logo.png" alt="Logo" />
          <h1 className="text-2xl font-extrabold text-[#003F63]">
            Deal Junkie
          </h1>
        </Link>
        <div className="flex items-center justify-center gap-5 w-[60%]">
          {[
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about-us" },
            { name: "How it Works", path: "/how-it-works" },
            { name: "Pricing", path: "/pricing" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`text-sm font-[500] hover:text-primary ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-[#1D2939]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {token ? (
          <div className="flex items-center justify-end gap-3 w-[20%]">
            <div className="flex items-center gap-4 ">
              <Notifications />
              <Link to="/inbox" className="relative">
                <FaRegComments className="w-7 h-7 text-gray-500 cursor-pointer relative" />
                <div className="absolute w-[14px] h-[14px] rounded-full bg-primary top-0 right-0 text-white text-[10px] flex items-center justify-center">
                  2
                </div>
              </Link>
              <ProfileDropdown />
            </div>
            {userInfo?.user?.role === "seller" && (
              <Link
                to="/find-jobs"
                className="rounded bg-primary text-[#02174C] px-4 py-2 cursor-pointer hover:opacity-80"
              >
                Find Jobs
              </Link>
            )}
            {userInfo?.user?.role === "buyer" && (
              <button
                className="rounded bg-primary text-[#02174C] px-4 py-2 cursor-pointer hover:opacity-80"
                onClick={() => {
                  setIsOpenPostProjectModal(true);
                }}
              >
                Post a Project
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-end w-[20%]">
            <div className="flex items-center gap-1">
              <button
                className="text-[#1D2939] hover:text-primary cursor-pointer"
                onClick={() => {
                  setIsOpenAuthModal(true);
                  setAuthModalType("login");
                }}
              >
                Login
              </button>
              /
              <button
                className="text-[#1D2939] hover:text-primary cursor-pointer"
                onClick={() => {
                  setIsOpenAuthModal(true);
                  setAuthModalType("signup");
                }}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </nav>
      <Auth
        isOpenModal={isOpenAuthModal}
        setIsOpenModal={setIsOpenAuthModal}
        authModalType={authModalType}
        setAuthModalType={setAuthModalType}
      />
      <PostProject
        isOpenModal={isOpenPostProjectModal}
        setIsOpenModal={setIsOpenPostProjectModal}
      />
    </>
  );
};

export default Navbar;

function ProfileDropdown() {
  const Navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(GlobalContext);
  const { EditProfile, loading } = useEditProfile();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const Logout = () => {
    removeAccessToken();
    removeRefreshToken();
    setUserInfo(null);
    Navigate("/");
  };

  const SwitchMode = (role) => {
    EditProfile({ user: { role: role } });
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="cursor-pointer flex justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
        title={`${userInfo?.user?.first_name} ${userInfo?.user?.last_name}`}
      >
        {userInfo?.user?.profile_picture ? (
          <img
            className="w-7 h-7 rounded-full object-cover"
            src={`${userInfo?.user?.profile_picture}`}
            alt=""
          />
        ) : (
          <svg
            className="w-7 h-7 text-gray-300 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-[99999]">
          <div className="p-3 flex items-center gap-2">
            {userInfo?.user?.profile_picture ? (
              <img
                className="w-7 h-7 rounded-full object-cover"
                src={`${userInfo?.user?.profile_picture}`}
                alt=""
              />
            ) : (
              <svg
                className="w-7 h-7 text-gray-300 dark:text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            )}
            <span className="font-semibold">
              {userInfo?.user?.first_name} {userInfo?.user?.last_name}
            </span>
          </div>

          {userInfo?.user?.role === "buyer" && (
            <div className="py-2">
              <button
                className="w-full px-4 py-2 flex items-center gap-2 hover:bg-[#0AF8860F] cursor-pointer"
                onClick={() => SwitchMode("seller")}
                disabled={loading}
              >
                <IoIosSwitch />
                <span>Switch to Selling</span>
              </button>
              {[
                {
                  name: "My Account",
                  path: "/dashboard/edit-profile",
                  icon: <FiUser />,
                },
                {
                  name: "My Tasks",
                  path: "/dashboard/my-tasks",
                  icon: <BsClipboardCheck />,
                },
                {
                  name: "Manage Payments",
                  path: "/dashboard/manage-payments",
                  icon: <BsCreditCard2Front />,
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-[#0AF8860F] cursor-pointer`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <button
                onClick={Logout}
                className="w-full px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-[#0AF8860F] cursor-pointer"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          )}
          {userInfo?.user?.role === "seller" && (
            <div className="py-2">
              <button
                className="w-full px-4 py-2 flex items-center gap-2 hover:bg-[#0AF8860F] cursor-pointer"
                onClick={() => SwitchMode("buyer")}
                disabled={loading}
              >
                <IoIosSwitch />
                <span>Switch to Buying</span>
              </button>
              {[
                {
                  name: "My Account",
                  path: "/dashboard/edit-profile",
                  icon: <FiUser />,
                },
                {
                  name: "My Jobs",
                  path: "/dashboard/my-jobs",
                  icon: <BsClipboardCheck />,
                },
                {
                  name: "Manage Payments",
                  path: "/dashboard/manage-payments",
                  icon: <BsCreditCard2Front />,
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-[#0AF8860F] cursor-pointer`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <button
                onClick={Logout}
                className="w-full px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-[#0AF8860F] cursor-pointer"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          )}
          {userInfo?.user?.role === "admin" && (
            <div className="py-2">
              {[
                {
                  name: "Dashboard",
                  path: "/admin/dashboard",
                  icon: <LuLayoutDashboard />,
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-[#0AF8860F] cursor-pointer`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <button
                onClick={Logout}
                className="w-full px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-[#0AF8860F] cursor-pointer"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
