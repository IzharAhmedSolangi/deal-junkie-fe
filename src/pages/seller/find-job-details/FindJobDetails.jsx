import { useParams } from "react-router-dom";
import Layout from "../../../components/shared/Layout";
import BuyerInfo from "./components/BuyerInfo";
import JobInfo from "./components/JobInfo";

function FindJobDetails() {
  const { jobsId } = useParams();

  return (
    <>
      <Layout>
        <div className="relative w-full h-auto bg-white pt-[70px] pb-40">
          <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]" />
          <div className="">
            <h1 className="font-bold text-3xl md:text-5xl text-center text-secondary mt-10">
              Find Job Details
            </h1>
            <div className="flex md:flex-row flex-col gap-8 mt-32 px-[5%]">
              <div className="w-full">
                <JobInfo />
              </div>
              <div className="md:w-[600px] w-full">
                <BuyerInfo />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default FindJobDetails;
