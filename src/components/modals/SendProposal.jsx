/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSendProposal from "../../services/seller/useSendProposal";
import { Link } from "react-router-dom";
import CircularProgress from "../shared/CircularProgress";
import Dropdown from "../shared/Dropdown";

const validationSchema = Yup.object({
  budget: Yup.string()
    .required("Budget is required")
    .max(100, "Limit exceeded"),
  description: Yup.string().required("Description is required"),
  experience: Yup.string().required("Experience is required"),
  availability: Yup.string().required("Availability is required"),
  portfolio_link: Yup.string(),
});

const budgets = [
  { name: "$10.25 / hr", value: 10.25 },
  { name: "$12.75 / hr", value: 12.75 },
  { name: "$15.50 / hr", value: 15.5 },
  { name: "$18.45 / hr", value: 18.45 },
  { name: "$20.85 / hr", value: 20.85 },
  { name: "$20.45 / hr", value: 20.45 },
];

function SendProposal(props) {
  const { isOpenModal, setIsOpenModal, selected } = props;
  const cancelButtonRef = useRef(null);
  const [percentage, setPercentage] = useState(0);
  const { SendProposal, sendProposal } = useSendProposal();

  const initialValues = {
    budget: "",
    description: "",
    experience: "",
    availability: "",
    portfolio_link: "",
  };

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        SendProposal({
          project: selected.id,
          budget: values.budget,
          description: values.description,
          experience: values.experience,
          availability: values.availability,
          portfolio_link: values.portfolio_link,
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

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleSelectBudget = (budget) => {
    setFieldValue("budget", budget);
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    setFieldValue("budget", value);
  };

  const [selectedExperience, setSelectedExperience] = useState(null);
  const handleExperieceChange = (item) => {
    setFieldValue("experience", item.value);
    setSelectedExperience(item);
  };

  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const handleAvailabilityChange = (item) => {
    setFieldValue("availability", item.value);
    setSelectedAvailability(item);
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
                    sendProposal.success
                      ? "w-[600px] h-auto py-12 md:px-[5%] px-2"
                      : "w-full h-auto py-12 md:px-[5%] px-2"
                  }`}
                >
                  <div
                    onClick={handleClose}
                    className="absolute top-[15px] right-[15px] cursor-pointer rounded border border-[#02174C33] w-[30px] h-[30px] flex justify-center items-center"
                  >
                    <AiOutlineClose className="text-[22px]" />
                  </div>
                  <div className="flex flex-col">
                    {!sendProposal.success && (
                      <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex items-center justify-between">
                          <div>
                            <h1 className="font-[600] text-[30px] text-secondary">
                              Send Service Request
                            </h1>
                            <p className="font-[500] text-[20px] text-[#6F7487]">
                              Describe details about your service
                            </p>
                          </div>
                          <CircularProgress percentage={percentage} />
                        </div>
                        <div className="pt-5 pb-10">
                          <div className="mt-4">
                            <label className="text-[16px] text-[#222222] font-[600]">
                              Your hourly budget
                            </label>
                            <div className="flex items-center justify-between gap-2 mt-2">
                              <div className="flex items-center gap-2 w-full">
                                {budgets.map((budget, index) => (
                                  <button
                                    key={index}
                                    className={`rounded-[40px] px-6 w-auto h-[40px] border text-[14px] font-[500] cursor-pointer hover:text-secondary hover:bg-primary hover:border-primary ${
                                      values.budget === budget.value
                                        ? "bg-primary border-primary text-secondary"
                                        : "border-[#02174C33] text-[#6F7487]"
                                    }`}
                                    onClick={() =>
                                      handleSelectBudget(budget.value)
                                    }
                                  >
                                    {budget.name}
                                  </button>
                                ))}
                              </div>
                              <input
                                type="number"
                                placeholder="Other"
                                onChange={handleBudgetChange}
                                className="w-[300px] h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                              />
                            </div>
                            {errors.budget && touched.budget && (
                              <p className="text-red-700 text-xs mt-1">
                                {errors.budget}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <div>
                              <Dropdown
                                placeholder="Select Availabilty"
                                options={[
                                  { name: "Full-time", value: "Full-time" },
                                  { name: "Part-time", value: "Part-time" },
                                ]}
                                selected={selectedAvailability}
                                onChange={(option) => {
                                  handleAvailabilityChange(option);
                                }}
                              />
                              {errors.availability && touched.availability && (
                                <p className="text-red-700 text-xs mt-1">
                                  {errors.availability}
                                </p>
                              )}
                            </div>
                            <div>
                              <Dropdown
                                placeholder="Select Experience"
                                options={[
                                  { name: "1-3 Years", value: "1-3 Years" },
                                  { name: "4-7 Years", value: "4-7 Years" },
                                  { name: "8-12 Years", value: "8-12 Years" },
                                  { name: "12+ Years", value: "12+ Years" },
                                ]}
                                selected={selectedExperience}
                                onChange={(option) => {
                                  handleExperieceChange(option);
                                }}
                              />
                              {errors.experience && touched.experience && (
                                <p className="text-red-700 text-xs mt-1">
                                  {errors.experience}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-4">
                            <input
                              type="text"
                              placeholder="Portfolio link"
                              name="portfolio_link"
                              value={values.portfolio_link}
                              onChange={handleChange}
                              className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                            />
                            {errors.portfolio_link &&
                              touched.portfolio_link && (
                                <p className="text-red-700 text-xs mt-1">
                                  {errors.portfolio_link}
                                </p>
                              )}
                          </div>

                          <div className="mt-4">
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
                            className="border border-secondary bg-secondary cursor-pointer hover:opacity-80 w-[120px] h-[40px] text-white rounded flex justify-center items-center"
                            type="submit"
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    )}
                    {sendProposal.success && (
                      <div className="flex flex-col justify-center items-center w-full">
                        <img src="/assets/icons/icon-2.png" alt="" />
                        <h1 className="font-[600] text-[32px] text-secondary">
                          Your serivce request is sent!
                        </h1>
                        <p className="font-[500] text-[16px] text-[#6F7487] text-center">
                          Thank you for submitting your service request.
                        </p>
                        <Link
                          to="/find-jobs"
                          className="bg-primary cursor-pointer hover:opacity-80 w-[150px] h-[40px] text-secondary rounded mt-6 flex justify-center items-center"
                        >
                          Go Other Jobs
                        </Link>
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

export default SendProposal;
