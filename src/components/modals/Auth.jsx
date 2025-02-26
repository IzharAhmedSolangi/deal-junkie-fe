/* eslint-disable react/prop-types */
import { Fragment, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import ForgotPassword from "../auth/ForgotPassword";
import VerifyOtp from "../auth/VerifyOtp";
import ResetPassword from "../auth/ResetPassword";

function Auth(props) {
  const {
    isOpenModal,
    setIsOpenModal,
    authModalType,
    setAuthModalType,
    forgotEmail,
    setForgotEmail,
  } = props;
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
            <div className="flex min-h-full items-center justify-center md:p-4 p-2">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-[16px] bg-white text-left shadow-xl transition-all md:w-[600px] w-full py-12 md:px-[5%] px-2">
                  <div
                    onClick={handleClose}
                    className="absolute top-[15px] right-[15px] cursor-pointer rounded border border-[#02174C33] w-[30px] h-[30px] flex justify-center items-center"
                  >
                    <AiOutlineClose className="text-[22px]" />
                  </div>
                  <div className="flex justify-center">
                    {authModalType === "login" && (
                      <Login setAuthModalType={setAuthModalType} />
                    )}
                    {authModalType === "signup" && (
                      <Signup setAuthModalType={setAuthModalType} />
                    )}
                    {authModalType === "forgot-password" && (
                      <ForgotPassword
                        setAuthModalType={setAuthModalType}
                        setForgotEmail={setForgotEmail}
                      />
                    )}
                    {authModalType === "verify-otp" && (
                      <VerifyOtp
                        setAuthModalType={setAuthModalType}
                        forgotEmail={forgotEmail}
                      />
                    )}
                    {authModalType === "reset-password" && (
                      <ResetPassword
                        setAuthModalType={setAuthModalType}
                        forgotEmail={forgotEmail}
                        setForgotEmail={setForgotEmail}
                      />
                    )}
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

export default Auth;
