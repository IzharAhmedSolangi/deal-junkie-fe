/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import BuyerInfo from "./components/BuyerInfo";
import JobInfo from "./components/JobInfo";
import useFindJobById from "../../../services/seller/useFindJobById";
import { useEffect } from "react";
import { ButtonLoader3 } from "../../../components/shared/ButtonLoaders";

function FindJobDetails() {
  const { jobId } = useParams();
  const { FindJob, findJob } = useFindJobById();

  useEffect(() => {
    if (jobId) {
      FindJob(jobId);
    }
  }, [jobId]);

  return (
    <>
      <div className="relative w-full h-auto bg-white pt-[70px] md:pb-40 pb-28">
        <div className="absolute md:top-[-100px] top-[-70px] left-0 w-full md:h-[400px] h-[350px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
        <div>
          <h1 className="font-bold md:text-[48px] text-[30px] text-center text-secondary mt-10">
            Job Details
          </h1>
          {!findJob.data && findJob.loading && (
            <div className="flex justify-center items-center w-full h-[300px]">
              <ButtonLoader3 />
            </div>
          )}
          {findJob.data && (
            <div className="flex md:flex-row flex-col gap-8 mt-32 px-[5%]">
              <div className="w-full">
                <JobInfo findJob={findJob} />
              </div>
              <div className="md:w-[600px] w-full">
                <BuyerInfo findJob={findJob} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FindJobDetails;
