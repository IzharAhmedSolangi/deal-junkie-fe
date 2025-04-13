/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import useGetMyTaskById from "../../../../services/buyer/useGetMyTasksById";
import { Link } from "react-router-dom";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { ButtonLoader3 } from "../../../../components/shared/ButtonLoaders";
import ShowMessage from "../../../../components/shared/ShowMessage";
import useAcceptProposal from "../../../../services/buyer/useAcceptProposal";
import { TiTick } from "react-icons/ti";

function MyTaskDetailsModal(props) {
  const { isOpenModal, setIsOpenModal, selected, setSelected } = props;
  const cancelButtonRef = useRef(null);
  const { GetMyTaskById, myTask, setMyTask } = useGetMyTaskById();

  useEffect(() => {
    if (selected) {
      setMyTask((prevState) => ({
        ...prevState,
        loading: true,
        message: null,
      }));
      GetMyTaskById(selected?.id);
    }
  }, [selected]);

  const handleClose = () => {
    setIsOpenModal(false);
    setSelected(null);
  };

  const { AcceptProposal, acceptProposal } = useAcceptProposal();

  const handleAcceptRequest = (proposalId) => {
    AcceptProposal(proposalId);
    GetMyTaskById(selected?.id);
  };

  return (
    <>
      <Transition.Root show={isOpenModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[99]"
          initialFocus={cancelButtonRef}
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#02174C33] transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center md:px-[5%] md:py-[2%] p-2">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-[16px] bg-white text-left shadow-xl transition-all w-full min-h-full md:py-12 md:px-6 p-5">
                  <div
                    onClick={handleClose}
                    className="absolute top-[15px] right-[15px] cursor-pointer rounded border border-[#02174C33] hover:text-primary hover:border-primary w-[30px] h-[30px] flex justify-center items-center"
                  >
                    <AiOutlineClose className="text-[22px]" />
                  </div>
                  {myTask.data && !myTask.loading && (
                    <div className="flex flex-col items-start">
                      {myTask.data?.status === "Receiving Offer" && (
                        <div className="px-3 py-1 shadow-sm rounded-sm bg-secondary text-white text-[15px] font-[700]">
                          {myTask.data?.status}
                        </div>
                      )}
                      {myTask.data?.status === "In Progress" && (
                        <div className="px-2 py-1 shadow-sm rounded-sm bg-primary text-white text-[12px] font-[700]">
                          {myTask.data?.status}
                        </div>
                      )}
                      {myTask.data?.status === "Cancelled" && (
                        <div className="px-2 py-1 shadow-sm rounded-sm bg-[#D92D20] text-white text-[12px] font-[700]">
                          {myTask.data?.status}
                        </div>
                      )}
                      <h1 className="text-[#222222] md:text-[20px] text-[16px] font-[600] mt-2">
                        Request details
                      </h1>
                      <p className="text-[#98A2B3] md:text-[16px] text-[12px]">
                        Please review carefully your request details before
                        submitting, you can edit or reschedule your task anytime
                        from your account.
                      </p>
                      {/* Task details */}
                      <TaskDetails myTask={myTask} />
                      {/* Proposals */}
                      {myTask.data?.status !== "Cancelled" && (
                        <Proposals
                          myTask={myTask}
                          handleAcceptRequest={handleAcceptRequest}
                          acceptProposal={acceptProposal}
                        />
                      )}
                      <div className="w-full flex items-center gap-1 mt-8">
                        {myTask.data?.status === "Receiving Offer" && (
                          <>
                            <button className="bg-[#AF2DCF0F] w-full h-[35px] border border-[#AF2DCF] rounded-sm text-[#AF2DCF] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                              <PiCurrencyDollarBold />
                              Update Price
                            </button>
                            <button className="bg-[#EA51670F] w-full h-[35px] border border-[#EA5167] rounded-sm text-[#EA5167] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                              <IoMdClose />
                              Delete Task
                            </button>
                          </>
                        )}
                        {myTask.data?.status === "In Progress" && (
                          <button className="bg-[#0AF8860D] w-full h-[35px] border border-primary rounded-sm text-primary text-[13px] cursor-pointer flex justify-center items-center">
                            <TiTick />
                            Complete Project
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  {myTask.loading && (
                    <div className="flex justify-center items-center w-full h-[300px]">
                      <ButtonLoader3 />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default MyTaskDetailsModal;

function TaskDetails(props) {
  const { myTask } = props;

  return (
    <div className="w-full md:mt-3 mt-1">
      <h2 className="text-[#222222] md:text-[18px] text-[15px] font-[600]">
        Task details
      </h2>
      <div className="grid grid-cols-2 md:gap-2 gap-1 w-full md:mt-3 mt-1">
        <div>
          <label className="text-[#222222] md:text-[16px] text-[13px] font-[500]">
            Category
          </label>
          <p className="text-[#6F7487] md:text-[16px] text-[12px] font-[400]">
            {myTask.data?.category}
          </p>
        </div>
        <div>
          <label className="text-[#222222] md:text-[16px] text-[13px] font-[500]">
            Title
          </label>
          <p className="text-[#6F7487] md:text-[16px] text-[12px] font-[400]">
            {myTask.data?.title}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full mt-2">
        <div>
          <label className="text-[#222222] md:text-[16px] text-[13px] font-[500]">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {myTask.data?.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-[#F2F4F7] text-[#222222] text-xs px-2 py-1 rounded-full text-[13px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[#222222] md:text-[16px] text-[13px] font-[500]">
            Estimated budget
          </label>
          <p className="text-[#6F7487] md:text-[16px] text-[12px] font-[400]">
            ${myTask.data?.budget} / hr
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 w-full mt-2">
        <div>
          <label className="text-[#222222] md:text-[16px] text-[13px] font-[500]">
            Task description
          </label>
          <p className="text-[#6F7487] md:text-[16px] text-[12px] font-[400]">
            {myTask.data?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Proposals(props) {
  const { myTask, handleAcceptRequest, acceptProposal } = props;

  return (
    <div className="w-full md:mt-5 mt-2">
      <h2 className="text-[#222222] md:text-[18px] text-[16px] font-[600]">
        Experts
      </h2>
      {myTask.data?.proposals?.length > 0 && (
        <div className="md:mt-3 mt-1 flex flex-col gap-3">
          {myTask.data?.proposals?.map((item, index) => (
            <div
              className="w-full h-auto md:p-4 p-2 rounded-xl border border-[#02174C33] flex md:flex-row flex-col md:items-center md:justify-between"
              key={index}
            >
              <div className="flex items-center md:gap-3 gap-2">
                {item.seller.user.profile_picture ? (
                  <img
                    src={item.seller.user.profile_picture}
                    alt=""
                    className="w-[80px] h-[80px] rounded-sm object-cover"
                  />
                ) : (
                  <div className="w-[80px] h-[80px] bg-gray-200 rounded-sm"></div>
                )}
                <div>
                  <p className="text-[#6F7487] text-[12px] font-[400]">
                    Request {item.status}
                  </p>
                  <h2 className="text-[#222222] text-[18px] font-[600]">
                    {item.seller.user.first_name} {item.seller.user.last_name}
                  </h2>
                </div>
              </div>
              <div className="flex items-center md:gap-3 gap-2 md:mt-0 mt-2">
                <Link
                  to={`/find-experts/${item.seller.id}`}
                  className="bg-[#02174C0F] md:w-[120px] w-full h-[35px] border border-secondary rounded-sm text-secondary text-[12px] cursor-pointer flex justify-center items-center"
                >
                  See Profile
                </Link>
                {myTask.data?.status === "In Progress" ? (
                  <button className="md:w-[120px] w-full h-[35px] border border-[#6F7487] rounded-sm text-[#6F7487] text-[12px] flex justify-center items-center">
                    Approved
                  </button>
                ) : (
                  <button
                    className="bg-[#0AF8860D] md:w-[120px] w-full h-[35px] border border-[#039855] rounded-sm text-[#039855] text-[12px] cursor-pointer flex justify-center items-center"
                    disabled={acceptProposal.loading}
                    onClick={() => handleAcceptRequest(item.id)}
                  >
                    {acceptProposal.loading ? (
                      <ButtonLoader3 />
                    ) : (
                      "Approve Request"
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {myTask.data?.proposals?.length === 0 && (
        <div className="flex justify-center items-center w-full h-[150px]">
          <ShowMessage title="Didn't received any proposal yet" />
        </div>
      )}
    </div>
  );
}
