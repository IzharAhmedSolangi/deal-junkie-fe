import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BsClipboardCheck, BsCreditCard2Front } from "react-icons/bs";
import { IoIosSwitch } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

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
import { FaTimes, FaUsers } from "react-icons/fa";
import ReconnectingWebSocket from "reconnecting-websocket";

const SOCKETS_URL = import.meta.env.VITE_SOCKETS_URL;

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

  const [notifications, setNotifications] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(null);
  // WebSocket connection
  const socketRef = useRef(null);
  const socketUrl = useMemo(
    () => `${SOCKETS_URL}/ws/notifications/?token=${token}`,
    [token]
  );

  // Connect to WebSocket
  const connectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    socketRef.current = new ReconnectingWebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket Connected");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        setUnreadMessages(response.unread_messages_count);
        setUnreadNotifications(response.count);
        setNotifications(response.notifications);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket Disconnected");
    };
  }, [socketUrl]);

  useEffect(() => {
    if (!token) return;
    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connectSocket]);

  return (
    <>
      <nav
        className={`bg-transparent w-full fixed top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-2xl" : ""
        }`}
      >
        <div className="w-full flex items-center justify-between md:px-5 px-3 h-[60px]">
          {/* Menu Button Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=" text-gray-700 hover:text-primary cursor-pointer md:hidden w-[33.33%]"
          >
            <FaBars className="text-2xl" />
          </button>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center md:justify-start justify-center md:gap-2 gap-1 w-[33.33%]"
          >
            <img
              src="/assets/logo/logo.png"
              alt="Deal Junkie"
              className="md:h-8 h-5"
            />
            <h1 className="text-[#003F63] font-extrabold md:text-2xl text-[15px]">
              Deal Junkie
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="md:flex hidden gap-5 justify-center items-center w-[33.33%]">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about-us" },
              { name: "How it Works", path: "/how-it-works" },
              { name: "Pricing", path: "/pricing" },
              { name: "Contact Us", path: "/contact-us" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`text-sm font-medium transition-transform duration-300 hover:scale-110 ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {token ? (
            <div className="flex justify-end items-center gap-2 w-[33.33%]">
              {" "}
              <Notifications
                notifications={notifications}
                unreadNotifications={unreadNotifications}
              />
              <Link to="/inbox" className="relative" title="Inbox">
                <CiMail className="text-xl text-gray-500 hover:text-primary w-7 h-7" />
                {unreadMessages > 0 && (
                  <span className="absolute top-[-3px] right-[-5px] bg-primary text-secondary text-xs w-4 h-4 text-[10px] flex items-center justify-center rounded-full">
                    {unreadMessages}
                  </span>
                )}
              </Link>
              <ProfileDropdown />
              {userInfo?.user?.role === "seller" && (
                <Link
                  to="/find-jobs"
                  className="hover-slide-button md:flex hidden rounded-sm bg-primary text-[#02174C] px-4 py-2 cursor-pointer"
                >
                  Find Jobs
                </Link>
              )}
              {userInfo?.user?.role === "buyer" && (
                <button
                  className="hover-slide-button md:flex hidden rounded-sm bg-primary text-[#02174C] px-4 py-2 cursor-pointer"
                  onClick={() => setIsOpenPostProjectModal(true)}
                >
                  Post a Project
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-end gap-1 w-[33.33%]">
              <button
                className="text-gray-700 hover:text-primary cursor-pointer transition-transform duration-300 hover:scale-120"
                onClick={() => {
                  setIsOpenAuthModal(true);
                  setAuthModalType("login");
                }}
              >
                Login
              </button>
              /
              <button
                className="text-gray-700 hover:text-primary cursor-pointer transition-transform duration-300 hover:scale-110"
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
                { name: "Contact Us", path: "/contact-us" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`text-[20px] font-medium transition-transform duration-300 hover:scale-110 ${
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
                      className="hover-slide-button rounded bg-primary text-[#02174C] px-4 py-2 cursor-pointer hover:opacity-80"
                    >
                      Find Jobs
                    </Link>
                  )}
                  {userInfo?.user?.role === "buyer" && (
                    <button
                      className="hover-slide-button rounded bg-primary text-[#02174C] px-4 py-2 cursor-pointer hover:opacity-80"
                      onClick={() => setIsOpenPostProjectModal(true)}
                    >
                      Post a Project
                    </button>
                  )}
                </>
              )}
            </div>
          )}
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
    const isNavigate = true;
    EditProfile({ user: { role: role } }, isNavigate);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="cursor-pointer flex justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
        title={`${userInfo?.user?.first_name}`}
      >
        {userInfo?.user?.profile_picture ? (
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={`${userInfo?.user?.profile_picture}`}
            alt=""
          />
        ) : (
          <div className="h-7 w-7 rounded-full bg-gray-300 flex items-center justify-center text-[15px] font-semibold text-white">
            {userInfo?.user?.first_name?.charAt(0).toUpperCase()}
          </div>
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
              <div className="h-7 w-7 rounded-full bg-gray-300 flex items-center justify-center text-[15px] font-semibold text-white">
                {userInfo?.user?.first_name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="font-semibold">{userInfo?.user?.first_name}</span>
          </div>

          {userInfo?.user?.role === "buyer" && (
            <div className="py-2">
              <button
                className="w-full px-4 py-2 flex items-center gap-2 hover:bg-[#0AF8860F] cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  SwitchMode("seller");
                }}
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
                {
                  name: "Referral Program",
                  path: "/referral-program",
                  icon: <FaUsers />,
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
                <FiLogOut className="flex-shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          )}
          {userInfo?.user?.role === "seller" && (
            <div className="py-2">
              <button
                className="w-full px-4 py-2 flex items-center gap-2 hover:bg-[#0AF8860F] cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  SwitchMode("buyer");
                }}
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
                {
                  name: "Referral Program",
                  path: "/referral-program",
                  icon: <FaUsers />,
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
