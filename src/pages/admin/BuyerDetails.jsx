/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import BuyerProfile from "./components/BuyerProfile";
import useGetBuyerById from "../../services/admin/useGetBuyerById ";
import { useEffect } from "react";

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
      <div className="w-full h-auto p-5">
        <div className="w-full mt-3">
          <BuyerProfile buyer={buyer} />
        </div>
      </div>
    </>
  );
}

export default BuyerDetails;
