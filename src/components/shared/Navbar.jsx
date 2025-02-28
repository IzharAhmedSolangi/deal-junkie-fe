/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BsClipboardCheck, BsCreditCard2Front } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";

import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken
} from "../../storage/storage";
import Auth from "../modals/Auth";

const Navbar = () => {
  const Navigate = useNavigate();
  const token = getAccessToken();
  const { userInfo } = useContext(GlobalContext);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState(null);

  const RouteToOtherPage = (route) => {
    Navigate(route);
  };

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
          <Link
            to="/"
            className="text-[#1D2939] text-sm font-[500] leading-4 hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="text-[#1D2939] text-sm font-[500] leading-4 hover:text-primary"
          >
            About Us
          </Link>
          <Link
            to="/how-it-works"
            className="text-[#1D2939] text-sm font-[500] leading-4 hover:text-primary"
          >
            How it Works
          </Link>
          <Link
            to="/pricing"
            className="text-[#1D2939] text-sm font-[500] leading-4 hover:text-primary"
          >
            Pricing
          </Link>
        </div>
        {token ? (
          <div className="flex items-center justify-end gap-3 w-[20%]">
            <div className="flex items-center gap-4 ">
              <Notifications />
              <div className="relative">
                <FaRegComments className="w-7 h-7 text-gray-500 cursor-pointer relative" />
                <div className="absolute w-[14px] h-[14px] rounded-full bg-primary top-0 right-0 text-white text-[10px] flex items-center justify-center">
                  2
                </div>
              </div>
              <ProfileDropdown />
            </div>
            <button className="rounded bg-primary text-[#02174C] px-4 py-2 cursor-pointer hover:opacity-80">
              Post a Project
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-3 w-[20%]">
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
            <button
              onClick={() => {
                setIsOpenAuthModal(true);
                setAuthModalType("login");
              }}
              className="rounded bg-primary text-[#02174C] px-4 py-2 cursor-pointer hover:opacity-80"
            >
              Post a Project
            </button>
          </div>
        )}
      </nav>
      <Auth
        isOpenModal={isOpenAuthModal}
        setIsOpenModal={setIsOpenAuthModal}
        authModalType={authModalType}
        setAuthModalType={setAuthModalType}
      />
    </>
  );
};

export default Navbar;

function ProfileDropdown() {
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
    window.location = "/";
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <FaUserCircle
        className="w-7 h-7 rounded-full text-gray-500 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
          <div className="p-3 flex items-center gap-2">
            <FaUserCircle className="w-7 h-7 rounded-full text-gray-500" />
            <span className="font-semibold">Sarah Taylor</span>
          </div>

          <ul className="py-2">
            <li className="px-4 py-2 flex items-center gap-2 hover:bg-[#0AF8860F] cursor-pointer">
              <FiUser />
              <span>My Account</span>
            </li>
            <li className="px-4 py-2 flex items-center gap-2 hover:bg-[#0AF8860F] cursor-pointer">
              <BsClipboardCheck />
              <span>My Tasks</span>
            </li>
            <li className="px-4 py-2 flex items-center gap-2 hover:bg-[#0AF8860F] cursor-pointer">
              <BsCreditCard2Front />
              <span>Manage Payments</span>
            </li>
            <li
              onClick={Logout}
              className="px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-[#0AF8860F] cursor-pointer"
            >
              <FiLogOut />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  return (
    <div className="relative" ref={dropdownRef}>
      <IoIosNotificationsOutline
        className="w-7 h-7 text-gray-500 cursor-pointer relative"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className="absolute w-[14px] h-[14px] rounded-full bg-primary top-0 right-0 text-white text-[10px] flex items-center justify-center">
        4
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-sm h-[400px] overflow-y-auto ">
          <div className="p-3">
            <h3 className="font-semibold text-lg">Notifications</h3>
          </div>

          <ul className="py-2">
            <li className="px-4 py-2 flex items-center gap-3 bg-green-100">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                <span className="font-semibold">James Smith</span> accepted your
                job offer
                <p className="text-sm text-gray-500">Just now</p>
              </div>
            </li>

            <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                Pay <span className="font-semibold">$234 to Susan Smith</span>{" "}
                as task is completed.
                <div className="flex gap-2 mt-1">
                  <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded">
                    Accept
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white text-sm rounded">
                    Reject
                  </button>
                </div>
                <p className="text-sm text-gray-500">5 mins ago</p>
              </div>
            </li>

            <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                Payment is sent to{" "}
                <span className="font-semibold">Robert Davis</span>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </li>

            <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                <span className="font-semibold">Karen Miller</span> sent you a
                text message.
                <p className="text-sm text-gray-500">10 Jun 2023</p>
              </div>
            </li>

            <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                <span className="font-semibold">Ralph Edwards</span> has
                refunded your amount.
                <p className="text-sm text-gray-500">10 Jun 2023</p>
              </div>
            </li>

            <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                Your task has been deleted.
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </li>
            {[...Array(3)].map((_, index) => (
              <li
                key={index}
                className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer"
              >
                <FaUserCircle className="w-8 h-8 text-gray-500" />
                <div>
                  <span className="font-semibold">User {index + 1}</span> sent
                  you a message.
                  <p className="text-sm text-gray-500">{index + 1} days ago</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
