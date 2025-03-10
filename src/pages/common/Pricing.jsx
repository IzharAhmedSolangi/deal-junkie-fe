import Layout from "../../components/shared/Layout";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { TbCashBanknoteOff, TbUserStar } from "react-icons/tb";

function Pricing() {
  return (
    <>
      <Layout>
        <div className="bg-white w-full h-auto pt-[70px] relative">
          <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
          <h1 className="font-[700] text-[48px] text-center text-secondary mt-4">
            Pricing
          </h1>
          <div className="mt-32 w-full h-auto">
            {/* First Container */}
            <section className="bg-white w-full flex flex-col items-center justify-center py-10">
              <div className="lg:w-[50%] w-full">
                <h3 className="font-[600] text-[20px] text-center text-primary">
                  We keep pricing straightforward
                </h3>
                <h1 className="font-[600] text-[40px] text-center text-secondary">
                  Our Pricing Structure is Simple, Transparent, & Fair
                </h1>
                <div className="bg-[#E9FFDB] border border-[#71B69530] rounded-2xl w-full h-[380px] mt-3 p-6 relative">
                  <div className="w-[60%] h-full flex flex-col justify-center">
                    <h1 className="font-[600] text-[24px] text-secondary">
                      Empowering you with seasoned deal professionals
                    </h1>
                    <div className="flex flex-col gap-1 mt-2 font-[400] text-[16px] text-[#494F57]">
                      <p>
                        ✅ Service providers set their own rates based on
                        expertise and project scope.
                      </p>
                      <p>✅ Buyers pay the listed price—no hidden fees.</p>
                      <p>
                        ✅ Deal Junkie takes a 20% platform fee from the service
                        providers earnings.
                      </p>
                    </div>
                    <button className="rounded-sm w-[130px] h-[40px] bg-primary font-bold text-[#003F63] text-center cursor-pointer mt-3 hover:opacity-80">
                      Post a Project
                    </button>
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <img
                      src="/assets/images/image-3.png"
                      alt=""
                      className="w-[260px] h-[340px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <div className="flex items-center gap-1 font-[500] text-[17px] text-[#2E5EB1]">
                  <IoCheckmarkCircleOutline />
                  Service Price: $500
                </div>
                <div className="flex items-center gap-1 font-[500] text-[17px] text-[#2E5EB1]">
                  <IoCheckmarkCircleOutline />
                  Provider Earning: $400 (after 20% platform fee)
                </div>
                <div className="flex items-center gap-1 font-[500] text-[17px] text-[#2E5EB1]">
                  <IoCheckmarkCircleOutline />
                  Buyer Pay: $500 (no Extra Charges)
                </div>
              </div>
            </section>
            {/* Second Container */}
            <section className="bg-[#3A4C5F0A] w-full h-auto flex flex-col items-center pt-12 pb-40 px-10">
              <h2 className="text-[40px] font-[600] text-[#1D2939]">
                Why this Model Work
              </h2>
              <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-5">
                {[
                  {
                    icon: <TbCashBanknoteOff />,
                    title: "No Upfront Costs",
                    description: "Providers only pay when they earn.",
                  },
                  {
                    icon: <MdOutlineSecurity />,
                    title: "Seamless Transactions",
                    description: "Secure payments through our platform.",
                  },
                  {
                    icon: <TbUserStar />,
                    title: "Quality Assurance",
                    description:
                      "Ensures a marketplace of top-tier professionals.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index === 1 ? "bg-[#003F63]" : "bg-white"
                    } w-full h-auto shadow-lg rounded-2xl p-8 flex flex-col items-start gap-2`}
                  >
                    <div
                      className={`${
                        index === 1 ? "text-[#003F63]" : "text-white"
                      } bg-[#01E678] text-[25px] rounded-full w-[60px] h-[60px] flex justify-center items-center`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3
                        className={`${
                          index === 1 ? "text-white" : "text-[#1D2939]"
                        } text-lg font-semibold`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`${
                          index === 1 ? "text-[#D0D5DD]" : "text-[#667085]"
                        } text-[15px] font-[400]`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Pricing;
