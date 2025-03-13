import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BsClipboardCheck, BsCreditCard2Front } from "react-icons/bs";
import { IoIosSwitch } from "react-icons/io";
import { FaBars, FaRegComments } from "react-icons/fa6";

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
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const token = getAccessToken();
  const location = useLocation();
  const { userInfo } = useContext(GlobalContext);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState(null);
  const [isOpenPostProjectModal, setIsOpenPostProjectModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        className={`bg-transparent w-full fixed top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-2xl" : ""
        }`}
      >
        <div className="w-full flex items-center justify-between md:px-5 px-3 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="md:flex hidden items-center gap-2 text-2xl font-extrabold w-[33.33%]"
          >
            <img src="/assets/logo/logo.png" alt="" className="h-8" />
            <h1 className="text-[#003F63]">Deal Junkie</h1>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=" text-gray-700 hover:text-primary cursor-pointer md:hidden w-[33.33%]"
          >
            <FaBars className="text-2xl" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-5 justify-center items-center w-[33.33%]">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about-us" },
              { name: "How it Works", path: "/how-it-works" },
              { name: "Pricing", path: "/pricing" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Link
            to="/"
            className="flex items-center justify-center gap-1 text-2xl font-extrabold md:hidden w-[33.33%]"
          >
            <img src="/assets/logo/logo.png" alt="" className="h-5" />
            <h1 className="text-[#003F63] text-[15px]">Deal Junkie</h1>
          </Link>
          {token ? (
            <div className="flex justify-end items-center gap-2 md:hidden w-[33.33%]">
              {" "}
              <Notifications />
              <Link to="/inbox" className="relative">
                <FaRegComments className="text-xl text-gray-500 text-[30px]" />
                <span className="absolute top-0 right-0 bg-primary text-secondary text-xs w-4 h-4 text-[10px] flex items-center justify-center rounded-full">
                  2
                </span>
              </Link>
              <ProfileDropdown />
            </div>
          ) : (
            <div className="flex md:hidden items-center justify-end gap-1 w-[33.33%]">
              <button
                className="text-gray-700 hover:text-primary cursor-pointer"
                onClick={() => {
                  setIsOpenAuthModal(true);
                  setAuthModalType("login");
                }}
              >
                Login
              </button>
              /
              <button
                className="text-gray-700 hover:text-primary cursor-pointer"
                onClick={() => {
                  setIsOpenAuthModal(true);
                  setAuthModalType("signup");
                }}
              >
                Register
              </button>
            </div>
          )}

          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full bg-white shadow-lg lg:hidden h-[100vh] flex flex-col items-center justify-center gap-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="lg:hidden text-gray-700 hover:text-primary cursor-pointer fixed right-3 top-3"
              >
                <FaTimes className="text-2xl" />
              </button>
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about-us" },
                { name: "How it Works", path: "/how-it-works" },
                { name: "Pricing", path: "/pricing" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`text-[20px] font-medium  transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-primary "
                      : "text-gray-700 hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {token && (
                <>
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
                      onClick={() => setIsOpenPostProjectModal(true)}
                    >
                      Post a Project
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {/* Auth & User Menu */}
          <div className="hidden md:flex items-center justify-end gap-3 w-[33.33%]">
            {token ? (
              <>
                <Notifications />
                <Link to="/inbox" className="relative">
                  <FaRegComments className="text-xl text-gray-500 text-[30px]" />
                  <span className="absolute top-0 right-0 bg-primary text-secondary text-xs w-4 h-4 text-[10px] flex items-center justify-center rounded-full">
                    2
                  </span>
                </Link>
                <ProfileDropdown />
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
                    onClick={() => setIsOpenPostProjectModal(true)}
                  >
                    Post a Project
                  </button>
                )}
              </>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  className="text-gray-700 hover:text-primary cursor-pointer"
                  onClick={() => {
                    setIsOpenAuthModal(true);
                    setAuthModalType("login");
                  }}
                >
                  Login
                </button>
                /
                <button
                  className="text-gray-700 hover:text-primary cursor-pointer"
                  onClick={() => {
                    setIsOpenAuthModal(true);
                    setAuthModalType("signup");
                  }}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
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
