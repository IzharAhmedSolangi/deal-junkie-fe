import React from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from "../../storage/storage";

const Navbar = () => {
  const Navigate = useNavigate();
  const token = getAccessToken();
  const { userInfo } = useContext(GlobalContext);

  const RouteToOtherPage = (route) => {
    Navigate(route);
  };

  const Logout = () => {
    removeAccessToken();
    removeRefreshToken();
  };

  return (
    <nav className="bg-transparent sticky top-0">
      <div className="flex justify-between items-center px-5 py-3">
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
        <div className="flex items-center justify-end gap-2 w-[20%]">
          <div className="flex items-center gap-1">
            <button className="text-[#1D2939] hover:text-primary cursor-pointer">
              Login
            </button>
            /
            <button className="text-[#1D2939] hover:text-primary cursor-pointer">
              Register
            </button>
          </div>
          <button className="rounded bg-primary text-[#02174C] px-4 py-2 cursor-pointer hover:opacity-80">
            Post a Project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
