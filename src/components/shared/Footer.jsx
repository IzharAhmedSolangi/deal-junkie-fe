import { Link } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import PostProjectButton from "./PostProjectButton";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import FindExpertsButton from "./FindExpertsButton";
import { getAccessToken } from "../../storage/storage";

import Aos from "aos";
import { useEffect } from "react";
function Footer() {
  return (
    <footer className="w-full h-auto bg-[#F6FFFF] bg-[url('/assets/images/footer-bg.png')] bg-cover bg-center md:px-[5%] px-[2.5%] pt-40 relative">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:text-left text-center">
        <div className="md:col-span-2 w-full">
          <Link
            to="/"
            className="flex flex-col md:flex-row items-center gap-2 text-[24px] font-extrabold"
          >
            <img
              src="/assets/logo/logo.png"
              alt="Logo"
              className="w-10 h-10 md:w-auto md:h-auto"
            />
            <h1 className="text-2xl font-extrabold text-[#003F63]">
              Deal Junkie
            </h1>
          </Link>
          <p className="text-[15px] font-[400] text-[#667085] mt-2">
            Schedule your first hassle-free experience now
          </p>
          <div className="w-full flex md:justify-start justify-center items-center gap-4 mt-4">
            <a
              href="#"
              target="_blank"
              rel="noferrer"
              className="text-[#6F7487] hover:text-secondary"
            >
              <RiInstagramFill className="text-[22px]" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noferrer"
              className="text-[#6F7487] hover:text-secondary"
            >
              <FaFacebook className="text-[22px]" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noferrer"
              className="text-[#6F7487] hover:text-secondary"
            >
              <FaTwitterSquare className="text-[22px]" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noferrer"
              className="text-[#6F7487] hover:text-secondary"
            >
              <FaLinkedin className="text-[22px]" />
            </a>
          </div>
        </div>
        {/* Columns for Links */}
        <div>
          <h1 className="text-[#022247] text-[18px] font-[600]">
            For Service Seekers
          </h1>
          <div className="flex flex-col gap-3 mt-3">
            <Link
              to="/find-experts"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              Find Seller
            </Link>
            <Link
              to="/explore-services"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              Explore Services
            </Link>
            <Link
              to="/seller-faqs"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              FAQs
            </Link>
            <Link
              to="/pros-near-me"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              Pros Near Me
            </Link>
          </div>
        </div>
        <div>
          <h1 className="text-[#022247] text-[18px] font-[600]">
            For Service Providers
          </h1>
          <div className="flex flex-col gap-3 mt-3">
            <Link
              to="/find-jobs"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              Find Buyers
            </Link>
            <Link
              to="/explore-services"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              Explore Services
            </Link>
            <Link
              to="/pros-near-me"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              Pros Near Me
            </Link>
            <Link
              to="/buyer-faqs"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              FAQs
            </Link>
          </div>
        </div>
        <div>
          <h1 className="text-[#022247] text-[18px] font-[600]">Company</h1>
          <div className="flex flex-col gap-3 mt-3">
            <Link
              to="/about-us"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              About Us
            </Link>
            <Link
              to="/pricing"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              Pricing Page
            </Link>
            <Link
              to="/help-center"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              Help Center
            </Link>
            <Link
              to="/contact-us"
              className="text-[#667085] text-[14px] font-normal hover:text-primary"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between border-t-[1px] border-[#6F7487] md:py-5 py-2 md:mt-6 mt-2 text-center md:text-left">
        <p className="text-[#667085] text-[14px] font-normal">
          © Copyright Deal Junkie 2025. All rights reserved.
        </p>
        <div className="flex items-center gap-3 mt-1 md:mt-0">
          <Link
            to="/privacy-policy"
            className="text-[#667085] text-[14px] font-normal hover:text-primary"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-conditions"
            className="text-[#667085] text-[14px] font-normal hover:text-primary"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
      <Banner />
    </footer>
  );
}

export default Footer;

function Banner() {
  const token = getAccessToken();
  const { userInfo } = useContext(GlobalContext);
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  return (
    <>
      <div
        data-aos="flip-up"
        data-aos-duration="2000"
        className="bg-[#003F63] md:w-[90%] w-[95%] md:h-[200px] h-[150px] rounded-[16px] absolute md:top-[-100px] top-[-75px] flex items-center justify-between px-[5%]"
      >
        <h1 className="text-white md:w-[50%] w-[80%] md:text-[32px] text-[16px] font-[600]">
          Schedule your first meeting now for a hassle-free experience
        </h1>
        {!token && <PostProjectButton />}
        {userInfo?.user?.role === "buyer" && (
          <div className="flex md:flex-row flex-col items-center gap-3">
            <FindExpertsButton />
            <PostProjectButton />
          </div>
        )}
        {userInfo?.user?.role === "seller" && <FindExpertsButton />}
      </div>
    </>
  );
}
