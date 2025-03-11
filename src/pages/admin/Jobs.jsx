/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useGetAllJobs from "../../services/admin/useGetAllJobs";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";

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
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4"></div>
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
