import Layout from "../../components/shared/Layout";
import {
  FaBriefcase,
  FaChartLine,
  FaMoneyBillWave,
  FaBuilding,
  FaLightbulb
} from "react-icons/fa";

function AboutUs() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full h-auto bg-white pt-[50px] pb-30 ">
        <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
        <h1 className="font-[700] text-[48px] text-center text-secondary mt-10">
          About Us
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
              Your Marketplace for On-Demand <br /> Financial Expertise
            </h2>
            <p className="mt-4 text-[#98A2B3] text-justify text-[16px] font-[400]">
              Navigating complex deals requires the right expertise. Deal Junkie
              is a marketplace that connects investors, entrepreneurs, and
              businesses with highly experienced finance professionals—including
              former investment bankers, private equity analysts, hedge fund
              analysts, and consultants. Whether you need due diligence,
              financial modeling, investment research, or deal structuring, we
              provide access to top-tier talent without the overhead of hiring a
              full-time team.
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

      {/* Who We Are Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          {/* Left side: Text Content */}
          <div className="md:w-1/2 h-[550px] p-6 rounded-lg shadow-l">
            <h2 className="text-3xl font-bold text-gray-900">Who we are</h2>
            <p className="mt-4 text-[#98A2B3] text-[16px] font-[400]">
              At Deal Junkie, we believe that great deals start with great
              insights. We created this platform to bridge the gap between those
              seeking expert due diligence, investment analysis, and deal
              execution support and the finance professionals who have spent
              years honing these skills in top-tier firms.
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <FaBriefcase className="text-blue-500 mt-1" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600]">
                    M&A specialists
                  </h1>
                  <p className="text-[#98A2B3] text-[16px] font-[400]">
                    who help buyers analyze businesses and negotiate terms.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaChartLine className="text-blue-500 mt-1" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600]">
                    Private equity & hedge fund professionals
                  </h1>
                  <p className="text-[#98A2B3] text-[16px] font-[400]">
                    who conduct deep investment research.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaMoneyBillWave className="text-blue-500 mt-1" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600]">
                    Venture capital analysts
                  </h1>
                  <p className="text-[#98A2B3] text-[16px] font-[400]">
                    who evaluate startups and market opportunities.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaBuilding className="text-blue-500 mt-1" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600]">
                    Real estate investment professionals
                  </h1>
                  <p className="text-[#98A2B3] text-[16px] font-[400]">
                    who underwrite deals and build financial models.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaLightbulb className="text-blue-500 mt-1" />
                <div>
                  <h1 className=" text-[#003F63] text-[20px] font-[600]">
                    Consultants & strategy experts
                  </h1>
                  <p className="text-[#98A2B3] text-[16px] font-[400]">
                    who provide industry and market analysis.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right side: Image */}
          <div className="md:w-1/2">
            <img
              src="/assets/images/mask-group1.png"
              alt="Our Team"
              className="rounded-lg shadow-lg h-[500px]"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Why Choose Deal Junkie?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            {
              title: "Experts On-Demand",
              desc: "Access top professionals instantly for any financial project."
            },
            {
              title: "Cost-Effective Solutions",
              desc: "Get expert advice without hiring full-time staff."
            },
            {
              title: "Data-Driven Insights",
              desc: "Make informed business decisions backed by real analytics."
            },
            {
              title: "Grow Your Business Effortlessly",
              desc: "Scale your company with trusted expert guidance."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-lg text-center"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-green-100 py-12 text-center mb-40">
        <h3 className="text-2xl font-bold text-gray-900">
          Deal Junkie connects you with the best financial professionals for a
          seamless investment experience.
        </h3>
        <button className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg">
          Get Started Today
        </button>
      </div>
    </Layout>
  );
}

export default AboutUs;
