import AppHead from "../../seo/AppHead";

function AboutUs() {
  return (
    <>
      <AppHead title="About Us - Deal Junkie" />
      {/* Hero Section */}
      <div className="relative w-full h-auto bg-white pb-30">
        <div className="w-full md:h-[320px] h-[260px] flex justify-center items-center">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            About Us
          </h1>
        </div>

        {/* Introduction Section */}
        <div className="w-full lg:px-[10%] md:px-[5%] px-6 md:py-8 py-5">
          <h1 className="text-primary md:text-[20px] text-[18px] font-[600]">
            Welcome to Deal Junkie
          </h1>
          <h2 className="md:text-[40px] text-[22px] font-bold text-[#1D2939]">
            Your Marketplace for On-Demand Financial Expertise
          </h2>
          <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400] mt-2">
            Navigating complex deals requires the right expertise. Deal Junkie
            is a marketplace that connects investors, entrepreneurs, and
            businesses with highly experienced finance professionals—including
            former investment bankers, private equity analysts, hedge fund
            analysts, and consultants. Whether you need due diligence, financial
            modeling, investment research, or deal structuring, we provide
            access to top-tier talent without the overhead of hiring a full-time
            team.
          </p>
          <img
            src="/assets/images/mask-group.png"
            alt="Financial Meeting"
            className="rounded-lg w-full h-auto object-cover mt-5"
          />
        </div>

        {/* Who We Are Section */}
        <div className="bg-[#FAFAFA] w-full lg:px-[5%] md:px-[3%] px-6 md:py-8 py-5">
          <div className="flex flex-col md:flex-row md:gap-10 gap-5">
            {/* Left side: Text Content */}
            <div>
              <h1 className="md:text-[40px] text-[20px] font-bold text-[#1D2939]">
                Who we are
              </h1>
              <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400] mt-1">
                At Deal Junkie, we believe that great deals start with great
                insights. We created this platform to bridge the gap between
                those seeking expert due diligence, investment analysis, and
                deal execution support and the finance professionals who have
                spent years honing these skills in top-tier firms.
              </p>
              <ul className="mt-6 flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <div>
                    <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                      M&A specialists
                    </h3>
                    <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400]">
                      who help buyers analyze businesses and negotiate terms.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <div>
                    <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                      Private equity & hedge fund professionals
                    </h3>
                    <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400]">
                      who conduct deep investment research.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <div>
                    <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                      Venture capital analysts
                    </h3>
                    <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400]">
                      who evaluate startups and market opportunities.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <div>
                    <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                      Real estate investment professionals
                    </h3>
                    <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400]">
                      who underwrite deals and build financial models.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/assets/icons/icon-4.png" alt="Our Team" />
                  <div>
                    <h3 className=" text-[#003F63] md:text-[20px] text-[15px] font-[600]">
                      Consultants & strategy experts
                    </h3>
                    <p className="text-[#98A2B3] md:text-[16px] text-[12px] font-[400]">
                      who provide industry and market analysis. With Deal
                      Junkie, investors and businesses can access world-class
                      financial expertise on demand, at a fraction of the
                      traditional cost.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <img
              src="/assets/images/mask-group1.png"
              alt="Our Team"
              className="rounded-lg w-full h-auto object-cover mt-5"
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white w-full lg:px-[5%] md:px-[3%] px-6 md:py-8 py-5">
          <h1 className="md:text-[40px] text-[20px] font-[600] text-center text-[#1D2939]">
            Why Choose Deal Junkie?
          </h1>
          <p className="md:text-[16px] text-[12px] font-[400] text-[#98A2B3] text-center md:px-50 px-0">
            At Deal Junkie, we believe that great deals start with great
            insights. We created this platform to bridge the gap between those
            seeking expert due diligence, investment analysis, and deal
            execution support and the finance professionals who have spent years
            honing these skills in top-tier firms.
          </p>
          <div className="flex justify-center flex-wrap gap-5 w-full mt-5">
            {[
              {
                title: "Flexible & On-Demand",
                desc: "Access finance professionals for one-time projects or ongoing advisory work.",
              },
              {
                title: "Top-Tier Talent",
                desc: "Work with experts from investment banking, private equity, hedge funds, and consulting.",
              },
              {
                title: "Cost-Effective Solutions",
                desc: "Get institutional-quality analysis without the overhead of a full-time hire.",
              },
              {
                title: "Seamless Matching Process",
                desc: "Quickly find the right expert for your needs through our tailored search.",
              },
              {
                title: "Elevate Your Business With Us",
                desc: "Whether you're acquiring a company, investing in real estate, analyzing a stock, or conducting due diligence,",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-6 rounded-lg md:w-[400px] w-full"
              >
                <img
                  src="/assets/icons/frame22.png"
                  alt="Our Team"
                  className="w-[50px] h-[50px]"
                />
                <h3 className="md:text-[24px] text-[18px] font-[600] mt-2 text-[#1D2939]">
                  {item.title}
                </h3>
                <p className="text-[16px] font-[400] text-[#667085]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-white w-full md:h-[400px] h-[550px] lg:px-[5%] md:px-[3%] px-6 md:py-8 py-5">
          <div className="bg-[#E9FFDB] w-full h-full relative rounded-[20px] md:p-10 p-10 flex flex-col md:items-start items-center md:justify-center justify-start">
            {/* Text & Button Section */}
            <div className="w-full md:w-[60%] text-center md:text-left">
              <h3 className="md:text-[36px] text-[18px] font-semibold text-[#022247]">
                Deal Junkie connects you with the expertise you need to make
                better investment decisions.
              </h3>
              <button className="mt-4 px-6 py-3 bg-secondary text-white font-semibold rounded-lg">
                Find Experts Now
              </button>
            </div>

            {/* Image Section */}
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

export default AboutUs;
