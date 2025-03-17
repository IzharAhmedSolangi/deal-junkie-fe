/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import SellerInformation from "./components/SellerInformation";
import SellerTimeDetails from "./components/SellerTimeDetails";
import useFindExpertById from "../../../services/buyer/useFindExpertById";
import { useEffect } from "react";
import { ButtonLoader3 } from "../../../components/shared/ButtonLoaders";

function FindExpertDetails() {
  const { sellerId } = useParams();
  const { FindExpert, findExpert } = useFindExpertById();

  useEffect(() => {
    if (sellerId) {
      FindExpert(sellerId);
    }
  }, [sellerId]);

  return (
    <>
      <div className="relative w-full h-auto bg-white pt-[70px] md:pb-40 pb-28">
        <div className="absolute md:top-[-100px] top-[-70px] left-0 w-full md:h-[400px] h-[350px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
        <div className="">
          <h1 className="font-bold md:text-[48px] text-[30px] text-center text-secondary mt-10">
            Seller Details
          </h1>
          {!findExpert.data && findExpert.loading && (
            <div className="flex justify-center items-center w-full h-[300px]">
              <ButtonLoader3 />
            </div>
          )}
          {findExpert.data && (
            <div className="flex md:flex-row flex-col gap-8 mt-32 px-[5%]">
              <div className="w-full">
                <SellerInformation findExpert={findExpert} />
              </div>
              <div className="md:w-[600px] w-full">
                <SellerTimeDetails findExpert={findExpert} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FindExpertDetails;
