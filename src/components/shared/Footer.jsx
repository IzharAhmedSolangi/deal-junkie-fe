import { Link } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full h-auto bg-[#F6FFFF] bg-[url('/assets/images/footer-bg.png')] bg-cover bg-center px-[5%] pt-40 relative">
      <div className="grid grid-cols-5 grid-rows-3 gap-4">
        <div className="col-span-2 row-span-2">
          <Link
            to="/"
            className="flex items-center gap-1 text-[24px] font-extrabold"
          >
            <img src="/assets/logo/logo.png" alt="Logo" />
            <h1 className="text-2xl font-extrabold text-[#003F63]">
              Deal Junkie
            </h1>
          </Link>
          <p className="text-[15px] font-[400] text-[#667085] mt-1">
            Schedule your first hassle free experience now
          </p>
          <div className="flex items-center gap-2 mt-2">
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
        <div className="row-span-2 col-start-3">
          <h1 className="text-[#022247] text-[18px] font-[600] leading-5">
            For Service Seekers
          </h1>
          <div className="flex flex-col gap-5 mt-5">
            <Link
              to="/find-experts"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              Find Seller
            </Link>
            <Link
              to="/explore-services"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              Explore Services
            </Link>
            <Link
              to="/faqs"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              FAQs
            </Link>
            <Link
              to="/pros-near-me"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              Pros Near Me
            </Link>
          </div>
        </div>
        <div className="row-span-2 col-start-4">
          <h1 className="text-[#022247] text-[18px] font-[600] leading-5">
            For Service Providers
          </h1>
          <div className="flex flex-col gap-5 mt-5">
            <Link
              to="/find-buyers"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              Find Buyers
            </Link>
            <Link
              to="/explore-services"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              Explore Services
            </Link>
            <Link
              to="/pros-near-me"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              Pros Near Me
            </Link>
            <Link
              to="/faqs"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              FAQs
            </Link>
          </div>
        </div>
        <div className="row-span-2 col-start-5">
          <h1 className="text-[#022247] text-[18px] font-[600] leading-5">
            Company
          </h1>
          <div className="flex flex-col gap-5 mt-5">
            <Link
              to="/about-us"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              About Us
            </Link>
            <Link
              to="/pricing"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              Pricing Page
            </Link>
            <Link
              to="/help-center"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              Help Center
            </Link>
            <Link
              to="/contact-us"
              className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between  border-t-[1px] border-[#6F7487] py-5">
        <p className="text-[#667085] text-[14px] font-normal leading-5">
          © Copyright Deal Junkie 2025. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Link
            to="/privacy-policy"
            className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-[#667085] text-[14px] font-normal leading-5 hover:text-primary"
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
  return (
    <>
      <div className="bg-[#003F63] w-[90%] h-[200px] rounded-[16px] absolute top-[-100px] flex items-center justify-between px-[5%]">
        <h1 className="text-white text-[32px] font-[600] leading-10">
          Schedule your first meeting now <br />
          for a hassle-free experience
        </h1>
        <button className="rounded w-[120px] h-[40px] bg-primary text-[#003F63] text-center cursor-pointer hover:opacity-80">
          Post a Project
        </button>
      </div>
    </>
  );
}
