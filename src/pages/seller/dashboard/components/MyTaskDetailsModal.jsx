/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import useGetMyTaskById from "../../../../services/buyer/useGetMyTasksById";
import { ButtonLoader3 } from "../../../../components/shared/ButtonLoaders";

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
                      {myTask.data?.status === "Delivered" && (
                        <div className="px-2 py-1 shadow-sm rounded-sm bg-primary text-white text-[12px] font-[700]">
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
                      {myTask.data?.status === "Completed" && (
                        <div className="px-2 py-1 shadow-sm rounded-sm bg-green-600 text-white text-[12px] font-[700]">
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
