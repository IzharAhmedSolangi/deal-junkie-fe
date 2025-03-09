/* eslint-disable react/prop-types */
import { CiCalendar, CiTimer } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { ButtonLoader3 } from "../../../../components/shared/ButtonLoaders";
import ShowMessage from "../../../../components/shared/ShowMessage";
import { MdOutlineMessage } from "react-icons/md";

function FindJobsCard(props) {
  const { findJobs } = props;

  return (
    <>
      <div className="px-10">
        {/* {findJobs.data && !findJobs.loading && ( */}
        <div className="mt-24">
          <h1 className="text-[#1D2939] text-[32px] font-[600]">Latest Jobs</h1>
          <div className="w-full grid grid-cols-2 gap-4 mt-1">
            {Array.from({ length: 10 }).map((item, index) => (
              <div
                key={index}
                className="border border-[#15202712] rounded-[10px] shadow-md w-full h-[200px] p-3"
              >
                <div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                      <CiCalendar />
                      July 25, 2025
                    </div>
                    <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                      <CiTimer />
                      3:30PM
                    </div>
                  </div>
                </div>
                <h1 className="text-[#222222] text-[20px] font-[600] mt-3">
                  Seeking skilled contractors for home improvement project
                </h1>
                <p className="text-[#98A2B3] text-[16px] mt-1">
                  Its not always easy to do whats not popular, but thats where
                  you make your money. Its not always easy to do whats not
                  popular, but thats where you make your money.
                </p>
                <div className="flex items-center gap-1 mt-3">
                  <button className="bg-[#51B8EA0F] w-full h-[35px] border border-[#2D9ACF] rounded-sm text-[#2D9ACF] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                    <IoEyeOutline />
                    See Details
                  </button>
                  <button className="bg-[#00B75F0F] w-full h-[35px] border border-[#00B75F] rounded-sm text-[#00B75F] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                    <MdOutlineMessage />
                    Send Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* )} */}
        {!findJobs.data && !findJobs.loading && findJobs.message && (
          <div className="flex justify-center mt-24 mb-10">
            <ShowMessage title={findJobs.message} />
          </div>
        )}
        {findJobs.loading && (
          <div className="flex justify-center mt-3">
            <ButtonLoader3 />
          </div>
        )}
      </div>
    </>
  );
}

export default FindJobsCard;
