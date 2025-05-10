import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { TbCashBanknoteOff, TbUserStar } from "react-icons/tb";
import AppHead from "../../seo/AppHead";
import PostProjectButton from "../../components/shared/PostProjectButton";
import FindExpertsButton from "../../components/shared/FindExpertsButton";
import { getAccessToken } from "../../storage/storage";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

function Pricing() {
  const token = getAccessToken();
  const { userInfo } = useContext(GlobalContext);

  return (
    <>
      <AppHead title="Pricing - Deal Junkie" />
      <div className="bg-white w-full h-auto relative">
        <div className="w-full md:h-[320px] h-[260px] flex justify-center items-center">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Pricing
          </h1>
        </div>
        <div className="w-full h-auto">
          {/* First Container */}
          <section className="bg-white w-full flex flex-col items-center justify-center md:py-8 py-5 md:px-0 px-5">
            <div className="lg:w-[50%] w-full">
              <h3 className="font-[600] md:text-[20px] text-[18px] text-center text-primary">
                We keep pricing straightforward
              </h3>
              <h1 className="font-[600] md:text-[40px] text-[22px] text-center text-secondary">
                Our Pricing Structure is Simple, Transparent, & Fair
              </h1>
              <div className="bg-[#E9FFDB] border border-[#71B69530] rounded-2xl w-full md:h-[380px] h-[660px] mt-3 p-6 relative">
                <div className="md:w-[60%] w-full h-full flex flex-col md:justify-center">
                  <h1 className="font-[600] text-[24px] text-secondary">
                    Empowering you with seasoned deal professionals
                  </h1>
                  <div className="flex flex-col gap-1 mt-2 font-[400] md:text-[16px] text-[12px] text-[#494F57]">
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
                  <div className="mt-3">
                    {!token && <PostProjectButton />}
                    {userInfo?.user?.role === "buyer" && <PostProjectButton />}
                    {userInfo?.user?.role === "seller" && <FindExpertsButton />}
                  </div>
                </div>
                <div className="absolute bottom-0 md:right-0">
                  <img
                    src="/assets/images/image-3.png"
                    alt=""
                    className="w-[260px] h-[340px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center flex-wrap md:gap-5 gap-1 mt-5">
              <div className="flex items-center gap-1 font-[500] md:text-[17px] text-[13px] text-[#2E5EB1]">
                <IoCheckmarkCircleOutline />
                Service Price: $500
              </div>
              <div className="flex items-center gap-1 font-[500] md:text-[17px] text-[13px] text-[#2E5EB1]">
                <IoCheckmarkCircleOutline />
                Provider Earning: $400 (after 20% platform fee)
              </div>
              <div className="flex items-center gap-1 font-[500] md:text-[17px] text-[13px] text-[#2E5EB1]">
                <IoCheckmarkCircleOutline />
                Buyer Pay: $500 (no Extra Charges)
              </div>
            </div>
          </section>
          {/* Second Container */}
          <section className="bg-[#3A4C5F0A] w-full h-auto flex flex-col items-center pt-12 pb-40 px-10">
            <h2 className="md:text-[40px] text-[22px] font-[600] text-[#1D2939]">
              Why this Model Work&apos;s
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
                    index === 1
                      ? "bg-[#003F63]"
                      : "bg-white group hover:bg-[#003F63]"
                  } w-full h-auto shadow-lg rounded-2xl p-8 flex flex-col items-start gap-2`}
                  data-aos="zoom-in-up"
                >
                  <div
                    className={`${
                      index === 1
                        ? "text-[#003F63]"
                        : "text-white group-hover:text-[#003F63]"
                    } bg-[#01E678] text-[25px] rounded-full w-[60px] h-[60px] flex justify-center items-center`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3
                      className={`${
                        index === 1
                          ? "text-white"
                          : "text-[#1D2939] group-hover:text-white"
                      } text-lg font-semibold`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`${
                        index === 1
                          ? "text-[#D0D5DD]"
                          : "text-[#667085] group-hover:text-[#D0D5DD]"
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
    </>
  );
}

export default Pricing;
