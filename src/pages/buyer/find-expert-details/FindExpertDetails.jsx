/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import SellerInformation from "./components/SellerInformation";
import SellerTimeDetails from "./components/SellerTimeDetails";
import useFindExpertById from "../../../services/buyer/useFindExpertById";
import { useEffect } from "react";
import { ButtonLoader3 } from "../../../components/shared/ButtonLoaders";
import AppHead from "../../../seo/AppHead";

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
      <AppHead title="Seller Details - Deal Junkie" />
      <div className="bg-white w-full h-auto md:pb-40 pb-28 relative">
        <div className="w-full md:h-[320px] h-[260px] flex flex-col justify-center items-center px-3">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Seller Details
          </h1>
        </div>
        {!findExpert.data && findExpert.loading && (
          <div className="flex justify-center items-center w-full h-[200px]">
            <ButtonLoader3 />
          </div>
        )}
        {findExpert.data && (
          <div className="flex md:flex-row flex-col gap-8 mt-5 px-[5%]">
            <div className="w-full">
              <SellerInformation findExpert={findExpert} />
            </div>
            <div className="md:w-[600px] w-full">
              <SellerTimeDetails findExpert={findExpert} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FindExpertDetails;
