/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BuyerProfile from "./components/BuyerProfile";
import useGetBuyerById from "../../services/admin/useGetBuyerById ";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import AppHead from "../../seo/AppHead";

function BuyerDetails() {
  const { buyerId } = useParams();
  const { GetBuyerById, buyer } = useGetBuyerById();

  useEffect(() => {
    if (buyerId) {
      GetBuyerById(buyerId);
    }
  }, [buyerId]);

  return (
    <>
      <AppHead title="Buyer Details - Deal Junkie" />
      <div className="w-full h-auto p-5">
        {!buyer.data && buyer.loading && (
          <div className="flex justify-center items-center w-full h-[300px]">
            <ButtonLoader3 />
          </div>
        )}
        {buyer.data && (
          <>
            <div className="flex items-center gap-1 mb-3">
              <Link
                to={"/admin/buyers"}
                className="text-[#02174C] hover:text-primary text-[18px] font-[500]"
              >
                Buyers
              </Link>
              /
              <p className="text-primary text-[18px] font-[500]">
                {buyer.data?.buyer_details?.first_name}{" "}
                {buyer.data?.buyer_details?.last_name}
              </p>
            </div>
            <div className="w-full mt-3">
              <BuyerProfile buyer={buyer} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default BuyerDetails;
