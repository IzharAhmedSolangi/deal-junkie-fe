/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "../shared/CircularProgress";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import Input from "../shared/Input";
import { FaDollarSign } from "react-icons/fa";
import { MdTitle } from "react-icons/md";
import useSendOffer from "../../services/common/useSendOffer";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  budget: Yup.string()
    .required("Budget is required")
    .max(100, "Limit exceeded"),
  delivery_date: Yup.string().required("Delivery date is required"),
  description: Yup.string().required("Description is required"),
});

function CreateOffer(props) {
  const { isOpenModal, setIsOpenModal, selected, setOfferResponse } = props;
  const Navigate = useNavigate();
  const cancelButtonRef = useRef(null);
  const [percentage, setPercentage] = useState(0);
  const { SendOffer, sendOffer, setSendOffer } = useSendOffer();

  const initialValues = {
    budget: "",
    title: "",
    description: "",
    delivery_date: "",
  };

  const { values, errors, handleChange, handleSubmit, touched, resetForm } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        SendOffer({
          buyer: selected?.chat_with,
          budget: values.budget,
          title: values.title,
          description: values.description,
          delivery_date: values.delivery_date,
          delivery_time: "3",
        });
      },
    });

  useEffect(() => {
    const totalFields = Object.keys(initialValues).length;
    const filledFields = Object.values(values).filter((value) =>
      Array.isArray(value) ? value.length > 0 : value
    ).length;
    const progress = Math.round((filledFields / totalFields) * 100);
    setPercentage(progress);
  }, [values]);

  useEffect(() => {
    if (sendOffer.data) {
      setOfferResponse(sendOffer.data);
    }
  }, [sendOffer]);

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const goToCustomOffers = () => {
    Navigate("/dashboard/custom-offers");
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
                  className={`relative transform overflow-hidden rounded-[16px] bg-white text-left shadow-xl transition-all  ${
                    sendOffer.success
                      ? "w-[600px] h-auto md:py-12 md:px-6 px-5 py-8"
                      : "w-[600px] h-auto md:py-12 md:px-6 px-5 py-8"
                  }`}
                >
                  <div
                    onClick={handleClose}
                    className="absolute top-[15px] right-[15px] cursor-pointer rounded border border-[#02174C33] hover:border-primary hover:text-primary w-[30px] h-[30px] flex justify-center items-center"
                  >
                    <AiOutlineClose className="text-[22px]" />
                  </div>
                  <div className="flex flex-col md:mt-1 mt-6">
                    {!sendOffer.success && (
                      <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex items-center justify-between">
                          <div>
                            <h1 className="font-[600] md:text-[30px] text-[24px] text-secondary">
                              Send Offer
                            </h1>
                            <p className="font-[500] md:text-[20px] text-[15px] text-[#6F7487]">
                              Describe details about your offer
                            </p>
                          </div>
                          <CircularProgress percentage={percentage} />
                        </div>
                        <div className="md:pb-5 py-2">
                          <div>
                            <label className="text-[16px] text-[#222222] font-[600]">
                              Title
                            </label>
                            <div className="mt-2">
                              <Input
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={values.title}
                                handleChange={handleChange}
                                icon={<MdTitle />}
                              />
                            </div>
                            {errors.title && touched.title && (
                              <p className="text-red-700 text-xs mt-1">
                                {errors.title}
                              </p>
                            )}
                          </div>

                          <div className="mt-2">
                            <label className="text-[16px] text-[#222222] font-[600]">
                              Budget
                            </label>
                            <div className="mt-2">
                              <Input
                                type="number"
                                placeholder="Budget"
                                name="budget"
                                value={values.budget}
                                handleChange={handleChange}
                                icon={<FaDollarSign />}
                              />
                            </div>
                            {errors.budget && touched.budget && (
                              <p className="text-red-700 text-xs mt-1">
                                {errors.budget}
                              </p>
                            )}
                          </div>

                          <div className="mt-2">
                            <label className="text-[16px] text-[#222222] font-[600]">
                              Delivery Date
                            </label>
                            <div className="mt-2">
                              <input
                                type="date"
                                placeholder="Date"
                                name="delivery_date"
                                value={values.delivery_date}
                                onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]}
                                className="peer w-full h-[40px] px-[10px] rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                              />
                            </div>
                            {errors.delivery_date && touched.delivery_date && (
                              <p className="text-red-700 text-xs mt-1">
                                {errors.delivery_date}
                              </p>
                            )}
                          </div>

                          <div className="mt-2">
                            <label className="text-[16px] text-[#222222] font-[600]">
                              Tell us the details of your service
                            </label>
                            <textarea
                              placeholder="Describe your service"
                              rows="4"
                              className="mt-2 w-full min-h-[150px] max-h-[150px]  p-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                              name="description"
                              value={values.description}
                              onChange={handleChange}
                            ></textarea>
                            {errors.description && touched.description && (
                              <p className="text-red-700 text-xs mt-1">
                                {errors.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="w-full flex justify-end">
                          <button
                            className="button-2 border border-secondary bg-secondary cursor-pointer w-[120px] h-[40px] text-white rounded flex justify-center items-center"
                            type="submit"
                            disabled={sendOffer.loading}
                          >
                            {sendOffer.loading ? <ButtonLoader1 /> : "Send"}
                          </button>
                        </div>
                      </form>
                    )}
                    {sendOffer.success && (
                      <div className="flex flex-col justify-center items-center w-full">
                        <img src="/assets/icons/icon-2.png" alt="" />
                        <h1 className="font-[600] text-[32px] text-secondary">
                          Your offer is sent!
                        </h1>
                        <p className="font-[500] text-[16px] text-[#6F7487] text-center">
                          Thank you for submitting your offer.
                        </p>
                        <div className="flex items-center gap-1">
                          <button
                            className="button-2 bg-primary cursor-pointer w-[150px] h-[40px] text-secondary rounded mt-6 flex justify-center items-center"
                            onClick={() => {
                              resetForm();
                              setIsOpenModal(false);
                              setTimeout(() => {
                                setSendOffer((prevState) => ({
                                  ...prevState,
                                  loading: false,
                                  data: null,
                                  error: null,
                                  success: false,
                                }));
                              }, 1000);
                            }}
                          >
                            Close
                          </button>
                          <button
                            className="button-2 bg-secondary cursor-pointer w-[150px] h-[40px] text-white rounded mt-6 flex justify-center items-center"
                            onClick={goToCustomOffers}
                          >
                            Custom Offers
                          </button>
                        </div>
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

export default CreateOffer;
