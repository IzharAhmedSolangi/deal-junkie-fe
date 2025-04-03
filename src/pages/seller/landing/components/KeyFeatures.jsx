import { FaLock, FaNetworkWired } from "react-icons/fa";
import { TbMessageDots } from "react-icons/tb";

function KeyFeatures() {
  return (
    <section className="flex flex-col items-center md:py-12 py-6 bg-white overflow-hidden">
      <h2 className="text-[40px] font-[600] text-[#1D2939]">Key Features</h2>
      <p className="text-[#667085] text-[15px] font-[400] text-center">
        Source, Transact, and Communicate with Financial Professionals. All at
        your fingertips.
      </p>
      <div className="mt-12 grid md:grid-cols-3 grid-cols-1 gap-8 px-10">
        {/* Secure Payments */}
        <div
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start"
          data-aos="zoom-in-up"
        >
          <div className="bg-[#01E678] text-white rounded-full w-[60px] h-[60px] flex justify-center items-center">
            <FaLock className="text-[25px]" />
          </div>
          <h3 className="text-lg font-semibold mt-1">Secure Payments</h3>
          <p className="text-[#667085] text-[15px] font-[400]">
            Transactions are processed through encrypted, industry-standard
            payment gateways. Escrow system ensures funds are only released upon
            project completion.
          </p>
        </div>

        {/* Expert Network (Highlighted) */}
        <div
          className="bg-[#003F63] rounded-2xl shadow-lg p-8 flex flex-col items-start -rotate-6"
          data-aos="zoom-in-up"
        >
          <div className="bg-[#01E678] text-white rounded-full w-[60px] h-[60px] flex justify-center items-center">
            <FaNetworkWired className="text-[25px]" />
          </div>
          <h3 className="text-lg text-white font-semibold mt-1">
            Expert Network
          </h3>
          <p className="text-white text-[15px] font-[400]">
            Connect with vetted professionals in M&A, private equity, analytical
            fields, and more. View ratings, portfolios, and project outcomes
            before hiring.
          </p>
        </div>

        {/* Real-Time Messaging */}
        <div
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start"
          data-aos="zoom-in-up"
        >
          <div className="bg-[#01E678] text-white rounded-full w-[60px] h-[60px] flex justify-center items-center">
            <TbMessageDots className="text-[25px]" />
          </div>
          <h3 className="text-lg font-semibold mt-1">Real-Time Messaging</h3>
          <p className="text-[#667085] text-[15px] font-[400]">
            Seamless in-platform communication for project collaboration. Secure
            file sharing to exchange financial models and documents.
          </p>
        </div>
      </div>
    </section>
  );
}

export default KeyFeatures;
