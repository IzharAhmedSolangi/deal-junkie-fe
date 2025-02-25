/* eslint-disable react/prop-types */
import { Fragment, useContext, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import GlobalContext from "../../context/GlobalContext";
import { getAccessToken } from "../../storage/storage";
import { ButtonLoader1 } from "../shared/ButtonLoaders";

function Delete(props) {
  const { isOpenModal, setIsOpenModal, url } = props;
  const token = getAccessToken();
  const BASE_URL = "";
  const { setUpdateResponse } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    await axios
      .delete(`${BASE_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsOpenModal(!isOpenModal);
        setUpdateResponse(true);
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        setLoading(false);
      });
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#fff]  text-left shadow-xl transition-all 2xl:w-[500px] lg:w-[500px] xs:w-full h-auto xs:mx-2 md:p-6 xs:p-3">
                <div className="absolute top-[10px] right-[10px] cursor-pointer">
                  <AiOutlineClose onClick={handleClose} />
                </div>
                <div className="flex flex-col ">
                  <h1 className="2xl:text-[28px] font-[600] lg:text-[24px] font-roboto text-center">
                    Delete Account
                  </h1>
                  <p className="font-[400] text-[15px] font-roboto text-[#1C1D1E] text-center mb-2">
                    Are you sure you want to delete your account? Once deleted,
                    you will no longer have access to your account, and all the
                    data will be permanently removed from our database.
                  </p>
                  <hr />
                  <div className="flex items-center justify-end gap-2 mt-5">
                    <button
                      className="bg-gray-200 w-[50%] h-[40px] rounded-[5px] outline-none border-none"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-500 w-[50%] h-[40px] flex justify-center items-center rounded-[5px] text-white outline-none border-none"
                      onClick={handleConfirmDelete}
                      disabled={loading}
                    >
                      {loading ? <ButtonLoader1 /> : "Delete"}
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
export default Delete;
