/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import BuyerInfo from "./components/BuyerInfo";
import JobInfo from "./components/JobInfo";
import useFindJobById from "../../../services/seller/useFindJobById";
import { useEffect } from "react";
import { ButtonLoader3 } from "../../../components/shared/ButtonLoaders";
import AppHead from "../../../seo/AppHead";

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
      <AppHead title="Job Details - Deal Junkie" />
      <div className="bg-white w-full h-auto md:pb-40 pb-28 relative">
        <div className="w-full md:h-[320px] h-[260px] flex flex-col justify-center items-center px-3">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Job Details
          </h1>
        </div>
        {!findJob.data && findJob.loading && (
          <div className="flex justify-center items-center w-full h-[200px]">
            <ButtonLoader3 />
          </div>
        )}
        {findJob.data && (
          <div className="flex md:flex-row flex-col gap-8 mt-5 px-[5%]">
            <div className="w-full">
              <JobInfo findJob={findJob} />
            </div>
            <div className="md:w-[600px] w-full">
              <BuyerInfo findJob={findJob} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FindJobDetails;
