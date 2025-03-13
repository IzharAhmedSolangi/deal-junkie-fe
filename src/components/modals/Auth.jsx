/* eslint-disable react/prop-types */
import { Fragment, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import ForgotPassword from "../auth/ForgotPassword";
import VerifyOtp from "../auth/VerifyOtp";
import ResetPassword from "../auth/ResetPassword";

function Auth(props) {
  const { isOpenModal, setIsOpenModal, authModalType, setAuthModalType } =
    props;
  const cancelButtonRef = useRef(null);
  const [forgotEmail, setForgotEmail] = useState(null);
  const [resetPasswordDetails, setResetPasswordDetails] = useState(null);

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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[16px] bg-white text-left shadow-xl transition-all md:w-[600px] w-full md:py-12 md:px-6 p-5">
                  <button
                    onClick={handleClose}
                    className="absolute top-[15px] right-[15px] cursor-pointer rounded border border-[#02174C33] w-[30px] h-[30px] flex justify-center items-center"
                  >
                    <AiOutlineClose className="text-[22px]" />
                  </button>
                  <div className="flex justify-center">
                    {authModalType === "login" && (
                      <Login
                        setAuthModalType={setAuthModalType}
                        handleClose={handleClose}
                      />
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
                        setResetPasswordDetails={setResetPasswordDetails}
                      />
                    )}
                    {authModalType === "reset-password" && (
                      <ResetPassword
                        forgotEmail={forgotEmail}
                        setAuthModalType={setAuthModalType}
                        resetPasswordDetails={resetPasswordDetails}
                      />
                    )}
                    {authModalType === "success-after-reset" && (
                      <div className="flex flex-col justify-center items-center w-full">
                        <img src="/assets/icons/icon-2.png" alt="" />
                        <h1 className="font-[600] text-[32px] text-secondary">
                          Password changed successfully
                        </h1>
                        <p className="font-[500] text-[16px] text-[#6F7487] text-center">
                          Your password has been successfully updated. You can
                          now sign in to your account using your new password.
                        </p>
                        <button
                          onClick={() => {
                            setAuthModalType("login");
                          }}
                          className="bg-primary cursor-pointer hover:opacity-80 w-[120px] h-[40px] text-secondary rounded mt-6 flex justify-center items-center"
                        >
                          Login Now
                        </button>
                      </div>
                    )}
                    {authModalType === "successfully-registered" && (
                      <div className="flex flex-col justify-center items-center w-full">
                        <img src="/assets/icons/icon-2.png" alt="" />
                        <h1 className="font-[600] text-[32px] text-secondary">
                          Registered successfully
                        </h1>
                        <p className="font-[500] text-[16px] text-[#6F7487] text-center">
                          Your account has been successfully registered. You can
                          now sign in to your account.
                        </p>
                        <button
                          onClick={() => {
                            setAuthModalType("login");
                          }}
                          className="bg-primary cursor-pointer hover:opacity-80 w-[120px] h-[40px] text-secondary rounded mt-6 flex justify-center items-center"
                        >
                          Login Now
                        </button>
                      </div>
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
