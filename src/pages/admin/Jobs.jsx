/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useGetAllJobs from "../../services/admin/useGetAllJobs";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import { IoEyeOutline } from "react-icons/io5";
import { CiCalendar, CiTimer } from "react-icons/ci";

function Jobs() {
  const { GetAllJobs, jobs } = useGetAllJobs();

  useEffect(() => {
    GetAllJobs();
  }, []);
  return (
    <>
      <div className="w-full h-auto p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[#02174C] text-[30px] font-[600]">Jobs</h1>
        </div>
        <div className="mt-3">
          {jobs.data && !jobs.loading && (
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
              {jobs.data?.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#15202712] rounded-[10px] shadow-md w-full h-[200px] p-3"
                >
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                        <CiCalendar />
                        {item.expected_completion_date}
                      </div>
                      <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                        <CiTimer />
                        11:59 PM
                      </div>
                    </div>
                  </div>
                  <h1 className="text-[#222222] text-[20px] font-[600] mt-3">
                    {item.title}
                  </h1>
                  <p className="text-[#98A2B3] text-[16px] mt-1">
                    {item.description}
                  </p>
                  <button className="bg-[#51B8EA0F] w-full h-[35px] border border-[#2D9ACF] rounded-sm text-[#2D9ACF] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                    <IoEyeOutline />
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
          {jobs.data && jobs.loading && (
            <div className="w-full flex justify-center mt-2">
              <ButtonLoader3 />
            </div>
          )}
          {!jobs.data && jobs.loading && (
            <div className="flex justify-center items-center w-full h-[300px]">
              <ButtonLoader3 />
            </div>
          )}
          {!jobs.data && !jobs.loading && jobs.message && (
            <div className="flex justify-center items-center w-full h-[300px]">
              <ShowMessage title={jobs.message} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Jobs;
