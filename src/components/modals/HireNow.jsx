/* eslint-disable react/prop-types */
import { Fragment, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";

function HireNow(props) {
  const { isOpenModal, setIsOpenModal, selectedSeller } = props;
  const cancelButtonRef = useRef(null);

  const handleClose = () => {
    setIsOpenModal(false);
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
                <Dialog.Panel
                  className={`relative transform overflow-hidden rounded-[16px] bg-white text-left shadow-xl transition-all
                        w-[600px] h-auto md:py-12 md:px-6 p-5`}
                >
                  <div
                    onClick={handleClose}
                    className="absolute top-[15px] right-[15px] cursor-pointer rounded border border-[#02174C33] hover:border-primary hover:text-primary w-[30px] h-[30px] flex justify-center items-center"
                  >
                    <AiOutlineClose className="text-[22px]" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col justify-center items-center w-full">
                      {selectedSeller?.user?.profile_picture ? (
                        <img
                          src={selectedSeller?.user?.profile_picture}
                          alt=""
                          className="w-[120px] h-[120px] object-cover rounded-full"
                        />
                      ) : (
                        <svg
                          className="w-[120px] h-[120px] rounded-full text-gray-200 dark:text-gray-700"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                      )}
                      <h1 className="font-[600] md:text-[32px] text-[24px] text-secondary">
                        Hire {selectedSeller?.user?.first_name}{" "}
                        {selectedSeller?.user?.last_name} Now
                      </h1>
                      <p className="font-[500] md:text-[16px] text-[13px] text-[#6F7487] text-center">
                        You&apos;ll receive a confirmation email shortly
                      </p>
                      <button className="bg-primary cursor-pointer hover:opacity-80 w-[150px] h-[40px] text-secondary rounded mt-6 flex justify-center items-center">
                        Yes Hire Now
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default HireNow;
