import Layout from "../../components/shared/Layout";
import {
  FaBriefcase,
  FaChartLine,
  FaMoneyBillWave,
  FaBuilding,
  FaLightbulb
} from "react-icons/fa";

function HowItWorks() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full h-auto bg-white pt-[50px] pb-30 ">
        <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
        <h1 className="font-[700] text-[48px] text-center text-secondary mt-10">
          How it Works
        </h1>
      </div>

      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="w-full flex flex-col items-center">
          <div className="w-[80%]">
            <h2 className="text-[#01E678] text-justify text-[20px] font-[600]">
              Welcome to Deal Junkie
            </h2>
            <h2 className="text-3xl font-bold text-gray-900">
              Your Marketplace for Expert Due Diligence
              <br /> & Investment Analysis
            </h2>
            <p className="mt-4 text-[#98A2B3] text-justify text-[16px] font-[400]">
              Navigating deals can be complex, whether you're acquiring a
              business, investing in a startup, or evaluating real estate
              opportunities. Deal Junkie connects you with experienced finance
              professionals—former investment bankers, private equity analysts,
              and consultants—who provide the expertise you need to analyze
              deals, assess risks, and make informed investment decisions.
            </p>
          </div>
          <div className="w-[80%] flex justify-center mt-2">
            <img
              src="/assets/images/mask-group.png"
              alt="Financial Meeting"
              className="rounded-lg shadow-lg w-full h-[450px]"
            />
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
          {/* Left side: Text Content */}
          <div className="md:w-[50%]">
            <img
              src="/assets/images/howwork.png"
              alt="Our Team"
              className="rounded-lg shadow-lg w-full h-[400px]"
            />
          </div>

          {/* Right side: Image */}
          <div className="md:w-[50%] h-[350px] px-6 rounded-lg shadow-l">
            <h2 className="text-3xl font-bold text-gray-900">
              Get Expert Deal Support
              <br /> On Demand
            </h2>
            <p className="mt-4 text-[#98A2B3] text-[16px] font-[400]">
              Looking to acquire a business but unsure how to evaluate
              financials or conduct due diligence? With Deal Junkie, you can
              instantly connect with ex-investment bankers and M&A professionals
              who can build financial models, assess risk factors, and guide you
              through the acquisition process.
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Financial modeling & valuation
                  </h1>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Due diligence checklists & risk assessments
                  </h1>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Business acquisition advisory
                  </h1>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <div className=" py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
          {/* Left side: Text Content */}
          <div className="md:w-[50%] h-[350px] px-6 rounded-lg shadow-l">
            <h2 className="text-3xl font-bold text-gray-900">
              Unlock Deep Market &
              <br /> Investment Research
            </h2>
            <p className="mt-4 text-[#98A2B3] text-[16px] font-[400]">
              Investing in public or private markets requires industry expertise
              and thorough research. Whether you're analyzing a small-cap stock,
              real estate deal, or venture investment, our experts provide
              tailored industry breakdowns, competitive analysis, and risk
              assessments to support your investment decisions.
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Equity & fixed income research
                  </h1>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Private market due diligence
                  </h1>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Venture & startup investment analysis{" "}
                  </h1>
                </div>
              </li>
            </ul>
          </div>
          {/* Right side: Image */}

          <div className="md:w-[50%]">
            <img
              src="/assets/images/howwork.png"
              alt="Our Team"
              className="rounded-lg shadow-lg w-full h-[400px]"
            />
          </div>
        </div>
      </div>
      {/* Section 3 */}
      <div className=" py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
          {/* Left side: Text Content */}
          <div className="md:w-[50%]">
            <img
              src="/assets/images/howwork.png"
              alt="Our Team"
              className="rounded-lg shadow-lg w-full h-[400px]"
            />
          </div>

          {/* Right side: Image */}
          <div className="md:w-[50%] h-[350px] px-6 rounded-lg shadow-l">
            <h2 className="text-3xl font-bold text-gray-900">
              Streamline M&A and Due
              <br /> Diligence Processes
            </h2>
            <p className="mt-4 text-[#98A2B3] text-[16px] font-[400]">
              Managing Virtual Data Rooms (VDRs), preparing Due Diligence
              Questionnaires (DDQs), and structuring deals can be overwhelming.
              Our professionals have worked on multi-million dollar transactions
              and can assist with everything from document reviews to deal
              structuring.
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Virtual Data Room (VDR) setup & management
                  </h1>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Due Diligence Questionnaires (DDQs) & compliance checks
                  </h1>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Deal structuring & negotiation support
                  </h1>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Section 4 */}
      <div className=" py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
          {/* Left side: Text Content */}
          <div className="md:w-[50%] h-[350px] px-6 rounded-lg shadow-l">
            <h2 className="text-3xl font-bold text-gray-900">
              Flexible, On-Demand
              <br />
              Expertise for Any Deal
            </h2>
            <p className="mt-4 text-[#98A2B3] text-[16px] font-[400]">
              Need help for a one-time project or ongoing advisory support?
              Whether it's a single valuation model or long-term deal execution,
              Deal Junkie lets you hire top-tier finance professionals on
              demand—without the overhead of a full-time team.
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    One-time deal analysis
                  </h1>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Retainer-based advisory support
                  </h1>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img src="/assets/icons/icon-4.png" alt="Our Team" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600] mt-1">
                    Full transaction lifecycle guidance
                  </h1>
                </div>
              </li>
            </ul>
          </div>
          {/* Right side: Image */}

          <div className="md:w-[50%]">
            <img
              src="/assets/images/howwork.png"
              alt="Our Team"
              className="rounded-lg shadow-lg w-full h-[400px]"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full mx-auto  py-5">
        <div className="flex justify-center flex-wrap w-full">
          {[
            {
              title:
                "Are you an investor, entrepreneur, or firm looking for financial expertise?",
              desc: "Post a project and get matched with the right finance professional."
            },
            {
              title:
                "Are you a finance professional looking for flexible deal work?",
              desc: "Join Deal Junkie and offer your expertise to businesses and investors.."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-lg  w-[45%] m-4 hover:bg-secondary hover:text-white"
            >
              <img
                src="/assets/icons/frame22.png"
                alt="Our Team"
                className="w-[50px] h-[50px]"
              />
              <h3 className="text-[24px] font-[600] ">{item.title}</h3>
              <p className="mt-2 text-[16px] font-[400]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-green-100 relative py-6 mx-10  mb-40 rounded-[7px] px-10 flex justify-between items-center w-full">
        <div className="w-[50%]">
          <h3 className="text-[38px] font-[600]  text-gray-900">
            Join Deal Junkie and take <br /> your deals to the next <br />{" "}
            level.
          </h3>
          <button className="mt-4 px-6 py-3 bg-secondary text-white font-semibold rounded-lg">
            Find Experts Now
          </button>
        </div>
        <img
          src="/assets/images/image-3.png"
          alt="Our Team"
          className="rounded-lg h-[270px] w-[270px] absolute bottom-0 right-30"
        />
      </div>
    </Layout>
  );
}

export default HowItWorks;
