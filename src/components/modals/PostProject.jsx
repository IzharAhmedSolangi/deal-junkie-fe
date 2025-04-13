/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calandar.css";
import usePostProject from "../../services/buyer/usePostProject";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import { format } from "date-fns";
import CircularProgress from "../shared/CircularProgress";
import { useNavigate } from "react-router-dom";
import Dropdown from "../shared/Dropdown";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required").max(100, "Limit exceeded"),
  budget: Yup.string()
    .required("Budget is required")
    .max(100, "Limit exceeded"),
  tags: Yup.array()
    .required("At least one brand is required")
    .min(1, "At least one tag is required")
    .test({
      name: "maxCharsPerBrand",
      message: "Each tag should not exceed 50 characters",
      test: (value) => value.every((brand) => brand.length <= 50),
    }),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  experience: Yup.string().required("Experience is required"),
  expected_completion_date: Yup.string().required("Please choose date"),
});

function PostProject(props) {
  const { isOpenModal, setIsOpenModal } = props;
  const cancelButtonRef = useRef(null);
  const Navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [percentage, setPercentage] = useState(0);
  const { PostProject, postProject, setPostProject } = usePostProject();

  useEffect(() => {
    if (isOpenModal) {
      setPostProject((prevState) => ({
        ...prevState,
        loading: false,
        data: null,
        error: null,
        success: false,
      }));
      setStep(1);
      setPercentage(0);
      resetForm();
    }
  }, [isOpenModal]);

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const initialValues = {
    title: "",
    budget: "",
    tags: [],
    description: "",
    expected_completion_date: "",
    category: "",
    experience: "",
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      PostProject(values);
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
                    postProject.success
                      ? "w-[600px] h-auto md:py-12 md:px-6 p-5"
                      : "w-full h-auto md:py-12 md:px-6 p-5"
                  }`}
                >
                  <div
                    onClick={handleClose}
                    className="absolute top-[15px] right-[15px] cursor-pointer rounded border border-[#02174C33] hover:border-primary hover:text-primary w-[30px] h-[30px] flex justify-center items-center"
                  >
                    <AiOutlineClose className="text-[22px]" />
                  </div>
                  <div className="flex flex-col">
                    {!postProject.success && step === 1 && (
                      <StepOne
                        setStep={setStep}
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        percentage={percentage}
                      />
                    )}
                    {!postProject.success && step === 2 && (
                      <StepTwo
                        setStep={setStep}
                        values={values}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        handleSubmit={handleSubmit}
                        postProject={postProject}
                        percentage={percentage}
                      />
                    )}
                    {postProject.success && (
                      <div className="flex flex-col justify-center items-center w-full">
                        <img src="/assets/icons/icon-2.png" alt="" />
                        <h1 className="font-[600] md:text-[32px] text-[24px] text-secondary">
                          Your request is sent!
                        </h1>
                        <p className="font-[500] md:text-[16px] text-[13px] text-[#6F7487] text-center">
                          Thank you for submitting your task request. Your
                          Expert is on it and will get back to you shortly.
                        </p>
                        <button
                          onClick={() => {
                            Navigate("/dashboard/my-tasks");
                            handleClose();
                          }}
                          className="bg-primary cursor-pointer hover:opacity-80 w-[150px] h-[40px] text-secondary rounded mt-6 flex justify-center items-center"
                        >
                          Go to My Tasks
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

export default PostProject;

const budgets = [
  { name: "$10.25 / hr", value: 10.25 },
  { name: "$12.75 / hr", value: 12.75 },
  { name: "$15.50 / hr", value: 15.5 },
  { name: "$18.45 / hr", value: 18.45 },
  { name: "$20.85 / hr", value: 20.85 },
  { name: "$20.45 / hr", value: 20.45 },
];

const tags = [
  // General Finance & Due Diligence
  "General Finance & Due Diligence",
  "Due Diligence",
  "Financial Modeling",
  "Valuation",
  "Investment Analysis",
  "Market Research",
  "M&A",
  "Capital Markets",
  "Private Equity",
  "Venture Capital",
  "Hedge Funds",
  "Investment Banking",
  "Corporate Finance",
  "Financial Strategy",
  "Restructuring",
  "Financial Statements",
  "Cash Flow Analysis",
  "Discounted Cash Flow (DCF)",
  "Comparable Company Analysis (CCA)",
  "Precedent Transactions",
  "Risk Assessment",

  // Industry-Specific Tags
  // Real Estate
  "Real Estate",
  "Multi-Family",
  "Commercial Real Estate",
  "Industrial",
  "Office",
  "Hospitality",
  "Campgrounds",
  "Retail",
  "Self-Storage",
  "Data Centers",
  "Single-Family Rentals (SFR)",
  "Manufactured Housing",
  "PropTech",
  "REITs",

  // Energy
  "Energy",
  "Oil & Gas",
  "Renewables",
  "Solar",
  "Wind",
  "Infrastructure",
  "Mining",
  "Metals",

  // Other Industries
  "Logistics",
  "Transportation",
  "Aerospace",
  "Defense",
  "Healthcare",
  "Biotech",
  "Pharmaceuticals",
  "MedTech",
  "Fintech",
  "Blockchain",
  "Cryptocurrency",
  "SaaS",
  "Software",
  "Artificial Intelligence (AI)",
  "Machine Learning",
  "Cybersecurity",
  "Consumer Goods",
  "Retail & E-commerce",
  "Luxury Goods",
  "Food & Beverage",
  "Agribusiness",
  "Manufacturing",
  "Industrial Services",
  "Automotive",
  "Electric Vehicles (EVs)",
  "Mobility",
  "Telecom",
  "Media",
  "Entertainment",
  "Gaming",
  "Sports",
  "Education",
  "Online Learning (EdTech)",

  // Investment Strategies & Structures
  "Investment Strategies & Structures",
  "Leveraged Buyouts (LBO)",
  "Growth Equity",
  "Distressed Investing",
  "Turnaround Strategies",
  "Special Situations",
  "PIPE Investments",
  "Private Placements",
  "SPACs",
  "IPOs",
  "Secondary Transactions",
  "Fundraising",
  "Joint Ventures (JV)",
  "Partnerships",
  "Limited Partners (LPs)",
  "General Partners (GPs)",
  "Family Offices",
  "Sovereign Wealth Funds",
  "Angel Investing",
  "Early-Stage Investments",
  "Series A",
  "Series B",
  "Late-Stage Growth",
  "Small-Cap",
  "Micro-Cap",
  "Mid-Cap",
  "Large-Cap",

  // Technical & Software Skills
  "Technical & Software Skills",
  "Excel",
  "VBA",
  "PowerPoint",
  "Pitch Decks",
  "Tableau",
  "SQL",
  "Python",
  "R Programming",
  "Data Visualization",
  "Financial Forecasting",
  "Scenario Analysis",
  "Sensitivity Analysis",
  "Budgeting & Forecasting",

  // ESG
  "ESG Investing",
  "Sustainability Analysis",
  "Corporate Governance",
];

function StepOne(props) {
  const {
    setStep,
    setFieldValue,
    values,
    touched,
    errors,
    handleChange,
    percentage,
  } = props;

  // Tags
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const handleTagClick = (tag) => {
    if (values.tags.includes(tag)) {
      setFieldValue(
        "tags",
        values.tags.filter((t) => t !== tag)
      );
    } else {
      setFieldValue("tags", [...values.tags, tag]);
    }
  };
  const displayedTags = expanded ? tags : tags.slice(0, 10);

  // Budget
  const handleSelectBudget = (budget) => {
    setFieldValue("budget", budget);
  };
  const handleBudgetChange = (e) => {
    const value = e.target.value;
    setFieldValue("budget", value);
  };

  // Experience
  const [selectedExperience, setSelectedExperience] = useState(null);
  const handleExperieceChange = (item) => {
    setFieldValue("experience", item.value);
    setSelectedExperience(item);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-[600] md:text-[30px] text-[24px] text-secondary">
              Post a request
            </h1>
            <p className="font-[500] md:text-[20px] text-[15px] text-[#6F7487]">
              Describe details about your request
            </p>
          </div>
          <CircularProgress percentage={percentage} />
        </div>
        <div className="md:pt-5 md:pb-10 py-2">
          <div>
            <input
              type="text"
              placeholder="Task title"
              name="title"
              value={values.title}
              onChange={handleChange}
              className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
            />
            {errors.title && touched.title && (
              <p className="text-red-700 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div className="md:mt-4 mt-2">
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={values.category}
              onChange={handleChange}
              className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
            />
            {errors.category && touched.category && (
              <p className="text-red-700 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          <div className="md:mt-4 mt-2">
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
              <p className="text-red-700 text-xs mt-1">{errors.experience}</p>
            )}
          </div>

          <div className="md:mt-4 mt-2">
            <label className="text-[16px] text-[#222222] font-[600]">
              Your estimated budget
            </label>
            <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-2 mt-2">
              <div className="flex flex-wrap items-center md:gap-2 gap-1 w-full">
                {budgets.map((budget, index) => (
                  <button
                    key={index}
                    className={`rounded-[40px] md:px-6 px-3 w-auto h-[40px] border md:text-[14px] text-[12px] font-[500] cursor-pointer hover:text-secondary hover:bg-primary hover:border-primary ${
                      values.budget === budget.value
                        ? "bg-primary border-primary text-secondary"
                        : "border-[#02174C33] text-[#6F7487]"
                    }`}
                    onClick={() => handleSelectBudget(budget.value)}
                  >
                    {budget.name}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Other"
                onChange={handleBudgetChange}
                className="md:w-[300px] w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
              />
            </div>
            {errors.budget && touched.budget && (
              <p className="text-red-700 text-xs mt-1">{errors.budget}</p>
            )}
          </div>

          <div className="md:mt-4 mt-2">
            <label className="text-[16px] text-[#222222] font-[600]">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {displayedTags.map((tag, index) => (
                <div
                  key={index}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 rounded-full border md:text-[14px] text-[12px] font-[500] cursor-pointer 
              ${
                values.tags.includes(tag)
                  ? "bg-primary border-primary text-secondary"
                  : "border-[#02174C33] text-[#6F7487]"
              }`}
                >
                  {tag}
                </div>
              ))}
            </div>

            {tags.length > 10 && (
              <button
                onClick={toggleExpand}
                className="mt-2 text-blue-500 text-sm font-medium cursor-pointer underline"
              >
                {expanded ? "Show Less" : `Show All (${tags.length})`}
              </button>
            )}

            {errors.tags && touched.tags && (
              <p className="text-red-700 text-xs mt-1">{errors.tags}</p>
            )}
          </div>

          <div className="md:mt-4 mt-2">
            <label className="text-[16px] text-[#222222] font-[600]">
              Tell us the details of your task
            </label>
            <textarea
              placeholder="Describe your task"
              rows="4"
              className=" mt-2 w-full min-h-[150px] max-h-[150px]  p-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
              name="description"
              value={values.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && touched.description && (
              <p className="text-red-700 text-xs mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="w-full flex justify-end">
          <button
            className="border border-secondary bg-secondary cursor-pointer hover:opacity-80 w-[120px] h-[40px] text-white rounded flex justify-center items-center"
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

function StepTwo(props) {
  const {
    setStep,
    setFieldValue,
    values,
    touched,
    errors,
    handleSubmit,
    postProject,
    percentage,
  } = props;

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = format(new Date(date), "yyyy-MM-dd");
      setFieldValue("expected_completion_date", formattedDate);
    }
  };

  const handleSubmitAndReview = () => {
    handleSubmit();
  };
  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-[600] md:text-[30px] text-[24px] text-secondary">
              Your task schedule
            </h1>
            <p className="font-[500] md:text-[20px] text-[15px] text-[#6F7487]">
              When do you need an Expert to be available to work?
            </p>
          </div>
          <CircularProgress percentage={percentage} />
        </div>

        <div className="pt-5 pb-10 flex flex-col justify-center items-center">
          <Calendar
            onChange={handleDateChange}
            value={
              values.expected_completion_date
                ? new Date(values.expected_completion_date)
                : null
            }
          />
          {errors.expected_completion_date &&
            touched.expected_completion_date && (
              <p className="text-red-700 text-xs mt-1">
                {errors.expected_completion_date}
              </p>
            )}
        </div>
        {postProject.error && (
          <p className="text-red-500 font-normal text-[15px] text-center my-3 w-full">
            {postProject.error}
          </p>
        )}
        <div className="w-full flex items-center justify-between">
          <button
            className="border border-secondary bg-[#F2F4F7] cursor-pointer hover:opacity-80 w-[120px] h-[40px] text-secondary rounded flex justify-center items-center"
            onClick={() => setStep(1)}
          >
            Back
          </button>
          <button
            className="border border-secondary bg-secondary cursor-pointer hover:opacity-80 w-[150px] h-[40px] text-white rounded flex justify-center items-center"
            type="button"
            disabled={postProject.loading}
            onClick={handleSubmitAndReview}
          >
            {postProject.loading ? <ButtonLoader1 /> : "Submit & Review"}
          </button>
        </div>
      </div>
    </>
  );
}
