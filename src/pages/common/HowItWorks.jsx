/* eslint-disable react/no-unescaped-entities */
import FindExpertsButton from "../../components/shared/FindExpertsButton";
import AppHead from "../../seo/AppHead";

function HowItWorks() {
  return (
    <>
      <AppHead title="How it Works - Deal Junkie" />
      {/* Hero Section */}
      <div className="relative w-full h-auto bg-white pb-30">
        <div className="w-full md:h-[320px] h-[260px] flex justify-center items-center">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            How it Works
          </h1>
        </div>

        {/* Introduction Section */}
        <div className="w-full lg:px-[10%] md:px-[5%] px-6 md:py-8 py-5">
          <h1 className="text-primary md:text-[20px] text-[18px] font-[600]">
            Welcome to Deal Junkie
          </h1>
          <h2 className="md:text-[40px] text-[22px] font-bold text-[#1D2939]">
            Your Marketplace for Expert Due Diligence & Investment Analysis
          </h2>
          <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400] mt-2">
            Navigating deals can be complex, whether you're acquiring a
            business, investing in a startup, or evaluating real estate
            opportunities. Deal Junkie connects you with experienced finance
            professionals—former investment bankers, private equity analysts,
            and consultants—who provide the expertise you need to analyze deals,
            assess risks, and make informed investment decisions.
          </p>
          <img
            src="/assets/images/mask-group.png"
            alt="Financial Meeting"
            className="rounded-lg w-full h-auto object-cover mt-5"
          />
        </div>

        {/* Section 1 */}
        <div className="w-full lg:px-[10%] md:px-[5%] px-6 md:py-8 py-5">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src="/assets/images/howwork.png"
              alt="Our Team"
              className="rounded-lg md:w-[50%] w-full h-auto object-contain"
            />
            <div className="md:w-[50%] w-full md:px-6 px-0 md:mt-0 mt-5">
              <h2 className="md:text-[40px] text-[22px] font-bold text-[#1D2939]">
                Get Expert Deal Support
                <br /> On Demand
              </h2>
              <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400] mt-1">
                Looking to acquire a business but unsure how to evaluate
                financials or conduct due diligence? With Deal Junkie, you can
                instantly connect with ex-investment bankers and M&A
                professionals who can build financial models, assess risk
                factors, and guide you through the acquisition process.
              </p>
              <ul className="flex flex-col gap-4 mt-6">
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Financial modeling & valuation
                  </h3>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Due diligence checklists & risk assessments
                  </h3>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Business acquisition advisory
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full lg:px-[10%] md:px-[5%] px-6 md:py-8 py-5">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-[50%] w-full md:px-6 px-0 md:mt-0 mt-5">
              <h2 className="md:text-[40px] text-[22px] font-bold text-[#1D2939]">
                Unlock Deep Market &
                <br /> Investment Research
              </h2>
              <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400] mt-1">
                Investing in public or private markets requires industry
                expertise and thorough research. Whether you're analyzing a
                small-cap stock, real estate deal, or venture investment, our
                experts provide tailored industry breakdowns, competitive
                analysis, and risk assessments to support your investment
                decisions.
              </p>
              <ul className="flex flex-col gap-4 mt-6">
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Equity & fixed income research
                  </h3>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Private market due diligence
                  </h3>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Venture & startup investment analysis{" "}
                  </h3>
                </li>
              </ul>
            </div>
            <img
              src="/assets/images/howwork.png"
              alt="Our Team"
              className="rounded-lg md:w-[50%] w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="w-full lg:px-[10%] md:px-[5%] px-6 md:py-8 py-5">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src="/assets/images/howwork.png"
              alt="Our Team"
              className="rounded-lg md:w-[50%] w-full h-auto object-contain"
            />
            <div className="md:w-[50%] w-full md:px-6 px-0 md:mt-0 mt-5">
              <h2 className="md:text-[40px] text-[22px] font-bold text-[#1D2939]">
                Streamline M&A and Due
                <br /> Diligence Processes
              </h2>
              <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400] mt-1">
                Managing Virtual Data Rooms (VDRs), preparing Due Diligence
                Questionnaires (DDQs), and structuring deals can be
                overwhelming. Our professionals have worked on multi-million
                dollar transactions and can assist with everything from document
                reviews to deal structuring.
              </p>
              <ul className="flex flex-col gap-4 mt-6">
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Virtual Data Room (VDR) setup & management
                  </h3>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Due Diligence Questionnaires (DDQs) & compliance checks
                  </h3>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Deal structuring & negotiation support
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="w-full lg:px-[10%] md:px-[5%] px-6 md:py-8 py-5">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-[50%] w-full md:px-6 px-0 md:mt-0 mt-5">
              <h2 className="md:text-[40px] text-[22px] font-bold text-[#1D2939]">
                Flexible, On-Demand
                <br />
                Expertise for Any Deal
              </h2>
              <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400] mt-1">
                Need help for a one-time project or ongoing advisory support?
                Whether it's a single valuation model or long-term deal
                execution, Deal Junkie lets you hire top-tier finance
                professionals on demand—without the overhead of a full-time
                team.
              </p>
              <ul className="flex flex-col gap-4 mt-6">
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    One-time deal analysis
                  </h3>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Retainer-based advisory support
                  </h3>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                    Full transaction lifecycle guidance
                  </h3>
                </li>
              </ul>
            </div>
            <img
              src="/assets/images/howwork.png"
              alt="Our Team"
              className="rounded-lg md:w-[50%] w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="w-full lg:px-[5%] md:px-[3%] px-6 md:py-8 py-5">
          <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5">
            {[
              {
                title:
                  "Are you an investor, entrepreneur, or firm looking for financial expertise?",
                desc: "Post a project and get matched with the right finance professional.",
              },
              {
                title:
                  "Are you a finance professional looking for flexible deal work?",
                desc: "Join Deal Junkie and offer your expertise to businesses and investors..",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-6 rounded-lg w-full group hover:bg-[#003F63]"
              >
                <img
                  src="/assets/icons/frame22.png"
                  alt="Our Team"
                  className="w-[50px] h-[50px]"
                />
                <h3 className="md:text-[24px] text-[18px] font-[600] mt-2 text-[#1D2939] group-hover:text-white">
                  {item.title}
                </h3>
                <p className="text-[16px] font-[400] text-[#667085] group-hover:text-white">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-white w-full md:h-[400px] h-[550px] lg:px-[5%] md:px-[3%] px-6 md:py-8 py-5">
          <div className="bg-[#E9FFDB] w-full h-full relative rounded-[20px] md:p-10 p-10 flex flex-col md:items-start items-center md:justify-center justify-start">
            <div className="w-full md:w-[60%] text-center md:text-left">
              <h3 className="md:text-[36px] text-[18px] font-semibold text-[#022247]">
                Join Deal Junkie and take your deals to the next level.
              </h3>
              <div className="mt-4">
                <FindExpertsButton />
              </div>
            </div>
            <div className="absolute bottom-0 md:right-16">
              <img
                src="/assets/images/image-5.png"
                alt=""
                className="w-[220px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
