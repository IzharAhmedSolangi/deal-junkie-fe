import { useContext, useEffect, useState } from "react";
import useGetCustomOffers from "../../../../services/buyer/useGetCustomOffers";
import { TruncateText } from "../../../../utils/TruncateText";
import JobCard from "../../../../components/skeltons/JobCard";
import { ButtonLoader3 } from "../../../../components/shared/ButtonLoaders";
import ShowMessage from "../../../../components/shared/ShowMessage";
import { TiTick } from "react-icons/ti";
import { CiCalendar, CiTimer } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import CustomOfferDetailsModal from "./CustomOfferDetailsModal";
import { IoMdClose } from "react-icons/io";
import RejectOffer from "../../../../components/modals/RejectOffer";
import GlobalContext from "../../../../context/GlobalContext";
import AcceptOffer from "../../../../components/modals/AcceptOffer";

function CustomOffers() {
  const { updateResponse } = useContext(GlobalContext);
  const { GetCustomOffers, customOffers, setCustomOffers } =
    useGetCustomOffers();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isOpenOfferDetailsModal, setIsOpenOfferDetailsModal] = useState(false);
  const [isOpenRejectOfferModal, setIsOpenRejectOfferModal] = useState(false);
  const [isOpenAcceptOfferModal, setIsOpenAcceptOfferModal] = useState(false);

  useEffect(() => {
    GetCustomOffers(1, false);
  }, [updateResponse]);

  const handleLoadMore = () => {
    if (customOffers.currentPage < customOffers.totalPages) {
      setCustomOffers((prevState) => ({
        ...prevState,
        loading: true,
      }));
      const nextPage = customOffers.currentPage + 1;
      GetCustomOffers(nextPage, true);
    }
  };
  return (
    <>
      <div className="w-full">
        <h1 className="font-semibold text-[30px] text-secondary">
          Custom Offers
        </h1>
        {!customOffers.loading && (
          <div className="w-full mt-2 flex flex-col gap-5">
            {customOffers.data?.map((item, index) => (
              <div
                key={index}
                className="border border-[#15202712] rounded-[10px] shadow-md w-full h-auto md:p-3 p-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                      <CiCalendar className="flex-shrink-0" />
                      {item.delivery_date}
                    </div>
                    <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                      <CiTimer className="flex-shrink-0" />
                      11:59 PM
                    </div>
                  </div>
                  {item?.status === "pending" && (
                    <div className="px-2 py-1 shadow-sm rounded-sm bg-primary text-white text-[12px] font-[700]">
                      Pending
                    </div>
                  )}
                  {item?.status === "accepted" && (
                    <div className="px-2 py-1 shadow-sm rounded-sm bg-primary text-white text-[12px] font-[700]">
                      Accepted
                    </div>
                  )}
                  {item?.status === "rejected" && (
                    <div className="px-2 py-1 shadow-sm rounded-sm bg-[#D92D20] text-white text-[12px] font-[700]">
                      Rejected
                    </div>
                  )}
                </div>
                <h1 className="text-[#222222] md:text-[20px] text-[16px] font-[600] mt-3">
                  {item.title}
                </h1>
                <p className="text-[#98A2B3] md:text-[16px] text-[12px] mt-1">
                  {TruncateText(item.description)}
                </p>
                <div className="flex items-center gap-1 mt-3">
                  <button
                    onClick={() => {
                      setSelectedOffer(item);
                      setIsOpenOfferDetailsModal(true);
                    }}
                    className="bg-[#51B8EA0F] w-full h-[35px] border border-[#2D9ACF] rounded-sm text-[#2D9ACF] text-[13px] cursor-pointer flex justify-center items-center gap-1"
                  >
                    <IoEyeOutline className="flex-shrink-0" />
                    See Details
                  </button>
                  {item.status === "pending" && (
                    <button
                      className="bg-[#EA51670F] w-full h-[35px] border border-[#EA5167] rounded-sm text-[#EA5167] text-[13px] cursor-pointer flex justify-center items-center gap-1"
                      onClick={() => {
                        setIsOpenRejectOfferModal(true);
                        setSelectedOffer(item);
                      }}
                    >
                      <IoMdClose className="flex-shrink-0" />
                      Reject Offer
                    </button>
                  )}
                  {item.status === "pending" && (
                    <button
                      className="bg-[#0AF8860D] w-full h-[35px] border border-primary rounded-sm text-primary text-[13px] cursor-pointer flex justify-center items-center"
                      onClick={() => {
                        setIsOpenAcceptOfferModal(true);
                        setSelectedOffer(item);
                      }}
                    >
                      <TiTick className="flex-shrink-0" />
                      Accept Offer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {customOffers.currentPage < customOffers.totalPages &&
          !customOffers.loading && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-primary text-secondary py-2 px-6 rounded-md cursor-pointer"
                onClick={handleLoadMore}
                disabled={customOffers.loading}
              >
                See More
              </button>
            </div>
          )}
        {customOffers.data && customOffers.loading && (
          <div className="w-full flex justify-center mt-2">
            <ButtonLoader3 />
          </div>
        )}
        {!customOffers.data && customOffers.loading && (
          <div className="w-full mt-5 flex flex-col gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <JobCard key={index} />
            ))}
          </div>
        )}
        {!customOffers.loading && customOffers.message && (
          <div className="flex justify-center items-center w-full md:h-[200px] h-[150px]">
            <ShowMessage title={customOffers.message} />
          </div>
        )}
      </div>

      <CustomOfferDetailsModal
        isOpenModal={isOpenOfferDetailsModal}
        setIsOpenModal={setIsOpenOfferDetailsModal}
        selected={selectedOffer}
        setSelected={setSelectedOffer}
      />

      <RejectOffer
        icon="/assets/icons/icon-3.png"
        title="You’re about to reject offer"
        description="If you reject offer once, this action can’t be undone."
        url={`/api/buyer/custom-offers/${selectedOffer?.id}/reject/`}
        isOpenModal={isOpenRejectOfferModal}
        setIsOpenModal={setIsOpenRejectOfferModal}
      />

      <AcceptOffer
        icon="/assets/icons/icon-2.png"
        title="You’re about to accept offer"
        description="If you accept offer once, this action can’t be undone."
        url={`/api/buyer/custom-offers/${selectedOffer?.id}/accept/`}
        isOpenModal={isOpenAcceptOfferModal}
        setIsOpenModal={setIsOpenAcceptOfferModal}
      />
    </>
  );
}

export default CustomOffers;
