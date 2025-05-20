/* eslint-disable react/prop-types */
import { Fragment, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { ButtonLoader1 } from "../../../components/shared/ButtonLoaders";
import useBlockUser from "../../../services/admin/useBlockUser";

function Block(props) {
  const { isOpenModal, setIsOpenModal, icon, title, description, userId } =
    props;
  const cancelButtonRef = useRef(null);
  const { BlockUser, blockUser } = useBlockUser();

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    BlockUser(userId, handleClose);
  };

  return (
    <Transition.Root show={isOpenModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
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
          <div className="flex min-h-full items-center justify-center sm:p-4 xs:p-1 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-[16px] bg-white text-left shadow-xl transition-all md:w-[600px] w-full md:py-12 md:px-6 p-5">
                <button
                  onClick={handleClose}
                  className="absolute top-[15px] right-[15px] cursor-pointer rounded border border-[#02174C33] hover:border-primary hover:text-primary w-[30px] h-[30px] flex justify-center items-center"
                >
                  <AiOutlineClose className="text-[22px]" />
                </button>
                <div className="flex flex-col justify-center items-center w-full">
                  <img src={icon} alt="" />
                  <h1 className="font-[600] md:text-[30px] text-[24px] text-secondary text-center">
                    {title}
                  </h1>
                  <p className="font-[400] md:text-[16px] text-[12px] text-[#6F7487] text-center">
                    {description}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-5">
                    <button
                      className="bg-[#02174C0F] border border-secondary cursor-pointer hover:opacity-80 w-[130px] h-[40px] text-secondary rounded flex justify-center items-center"
                      onClick={handleClose}
                    >
                      Not Now
                    </button>
                    <button
                      className="button-2 bg-[#EA5167] border border-[#EA5167] cursor-pointer w-[120px] h-[40px] text-white rounded flex justify-center items-center"
                      onClick={handleConfirm}
                      disabled={blockUser.loading}
                    >
                      {blockUser.loading ? <ButtonLoader1 /> : "Block"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default Block;
