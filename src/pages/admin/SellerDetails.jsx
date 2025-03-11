/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import SellerInformation from "./components/SellerInformation";
import SellerProfile from "./components/SellerProfile";
import useGetSellerById from "../../services/admin/useGetSellerById";
import { useEffect } from "react";

function SellerDetails() {
  const { sellerId } = useParams();
  const { GetSellerById, seller } = useGetSellerById();

  useEffect(() => {
    if (sellerId) {
      GetSellerById(sellerId);
    }
  }, [sellerId]);

  return (
    <>
      <div className="w-full h-auto p-5">
        <div className="flex md:flex-row flex-col gap-8 mt-3">
          <div className="w-full">
            <SellerInformation seller={seller} />
          </div>
          <div className="md:w-[600px] w-full">
            <SellerProfile seller={seller} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerDetails;
