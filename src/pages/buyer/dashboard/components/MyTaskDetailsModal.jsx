/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import useGetMyTaskById from "../../../../services/buyer/useGetMyTasksById";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import {
  ButtonLoader1,
  ButtonLoader2,
  ButtonLoader3,
} from "../../../../components/shared/ButtonLoaders";
import ShowMessage from "../../../../components/shared/ShowMessage";
import useAcceptProposal from "../../../../services/buyer/useAcceptProposal";
import { TiTick } from "react-icons/ti";
import { IoCloudDownloadOutline } from "react-icons/io5";
import GlobalContext from "../../../../context/GlobalContext";
import useRatingReviews from "../../../../services/buyer/useRatingReviews";
import * as Yup from "yup";
import { useFormik } from "formik";
import useDownload from "../../../../services/common/useDownload";
import { FormatDateAndTime } from "../../../../utils/FormatDate";

function MyTaskDetailsModal(props) {
  const { isOpenModal, setIsOpenModal, selected, setSelected } = props;
  const cancelButtonRef = useRef(null);
  const { GetMyTaskById, myTask, setMyTask } = useGetMyTaskById();
  const [completed, setCompleted] = useState(false);
  const { userInfo } = useContext(GlobalContext);

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
    setCompleted(false);
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
                  {completed ? (
                    <CompleteAndReviews
                      myTask={myTask.data}
                      userInfo={userInfo}
                      handleClose={handleClose}
                      setCompleted={setCompleted}
                    />
                  ) : (
                    <div>
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
                            submitting, you can edit or reschedule your task
                            anytime from your account.
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
                          {/* Order Details */}
                          {myTask.data?.delivered_order && (
                            <OrderDelivered myTask={myTask} />
                          )}
                          <div className="w-full flex items-center gap-1 mt-8">
                            {myTask.data?.status === "Receiving Offer" && (
                              <>
                                {/* <button className="bg-[#AF2DCF0F] w-full h-[35px] border border-[#AF2DCF] rounded-sm text-[#AF2DCF] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                                  <PiCurrencyDollarBold />
                                  Update Price
                                </button> */}
                                <button className="bg-[#EA51670F] w-full h-[35px] border border-[#EA5167] rounded-sm text-[#EA5167] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                                  <IoMdClose />
                                  Delete Task
                                </button>
                              </>
                            )}
                            {myTask.data?.status === "Delivered" && (
                              <button
                                onClick={() => setCompleted(true)}
                                className="bg-[#0AF8860D] w-full h-[35px] border border-primary rounded-sm text-primary text-[13px] cursor-pointer flex justify-center items-center"
                              >
                                <TiTick className="flex-shrink-0" />
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
      {myTask.data?.tags && (
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
      )}
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
      {myTask.data?.seller && (
        <div className="md:mt-3 mt-1 flex flex-col gap-3">
          <div className="w-full h-auto md:p-4 p-2 rounded-xl border border-[#02174C33] flex md:flex-row flex-col md:items-center md:justify-between">
            <div className="flex items-center md:gap-3 gap-2">
              {myTask.data?.seller?.profile_picture ? (
                <img
                  src={myTask.data?.seller?.profile_picture}
                  alt=""
                  className="w-[80px] h-[80px] rounded-sm object-cover"
                />
              ) : (
                <div className="w-[80px] h-[80px] bg-gray-200 rounded-sm"></div>
              )}
              <div>
                <p className="text-[#6F7487] text-[12px] font-[400]">
                  Request accepted
                </p>
                <h2 className="text-[#222222] text-[18px] font-[600]">
                  {myTask.data?.seller?.first_name}
                </h2>
              </div>
            </div>
            <div className="flex items-center md:gap-2 gap-1 md:mt-0 mt-2">
              <Link
                className="bg-[#02174C0F] md:w-[120px] w-full h-[35px] border border-secondary rounded-sm text-secondary text-[12px] cursor-pointer flex justify-center items-center"
                to={`/inbox?userId=${myTask.data?.seller?.id}&username=${myTask.data?.seller?.first_name}`}
              >
                Send Message
              </Link>
              <Link
                to={`/find-experts/${myTask.data?.seller.id}`}
                className="bg-[#02174C0F] md:w-[120px] w-full h-[35px] border border-secondary rounded-sm text-secondary text-[12px] cursor-pointer flex justify-center items-center"
              >
                See Profile
              </Link>
              <button className="md:w-[120px] w-full h-[35px] border border-[#6F7487] rounded-sm text-[#6F7487] text-[12px] flex justify-center items-center">
                Approved
              </button>
            </div>
          </div>
        </div>
      )}
      {!myTask.data?.seller && myTask.data?.proposals?.length > 0 && (
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
                    {item.seller.user.first_name}
                  </h2>
                </div>
              </div>
              <div className="flex items-center md:gap-2 gap-1 md:mt-0 mt-2">
                <Link
                  className="bg-[#02174C0F] md:w-[120px] w-full h-[35px] border border-secondary rounded-sm text-secondary text-[12px] cursor-pointer flex justify-center items-center"
                  to={`/inbox?userId=${item.seller.user.id}&username=${item.seller?.user.first_name}`}
                >
                  Send Message
                </Link>
                <Link
                  to={`/find-experts/${item.seller.id}`}
                  className="bg-[#02174C0F] md:w-[120px] w-full h-[35px] border border-secondary rounded-sm text-secondary text-[12px] cursor-pointer flex justify-center items-center"
                >
                  See Profile
                </Link>
                {item?.status === "accepted" ? (
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
      {!myTask.data?.seller && myTask.data?.proposals?.length === 0 && (
        <div className="flex justify-center items-center w-full h-[150px]">
          <ShowMessage title="Didn't received any proposal yet" />
        </div>
      )}
    </div>
  );
}

function OrderDelivered(props) {
  const { myTask } = props;
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { Download, loading } = useDownload();

  const handleDownload = (file) => {
    if (!file?.includes(BASE_URL)) return null;
    const urlParts = file.split("/");
    const fileName = decodeURIComponent(urlParts[urlParts.length - 1]);

    Download(fileName);
  };

  return (
    <>
      <div className="w-full md:mt-5 mt-2">
        <h2 className="text-[#222222] md:text-[18px] text-[16px] font-[600]">
          Order Submitted
        </h2>
        <div className="w-full h-auto md:p-4 p-2 rounded-xl border border-[#02174C33] mt-3 flex flex-col gap-2">
          <div>
            <label className="text-[#222222] md:text-[16px] text-[13px] font-[500]">
              Delivered Date
            </label>
            <p className="text-[#6F7487]">
              {FormatDateAndTime(myTask?.data?.delivered_order?.delivered_at)}
            </p>
          </div>
          <div>
            <label className="text-[#222222] md:text-[16px] text-[13px] font-[500]">
              Delivered Description
            </label>
            <p className="text-[#6F7487]">
              {myTask?.data?.delivered_order?.delivery_description}
            </p>
          </div>
          <button
            className="flex items-center justify-center gap-1 border border-primary bg-primary text-secondary rounded-[4px] w-[140px] h-[35px] cursor-pointer hover:opacity-80 mt-2"
            onClick={() =>
              handleDownload(myTask?.data?.delivered_order?.delivery_file)
            }
            disabled={loading}
          >
            {loading ? (
              <ButtonLoader1 />
            ) : (
              <>
                <IoCloudDownloadOutline className="text-[22px] flex-shrink-0" />
                <p>Attachment</p>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

const validationSchema = Yup.object({
  rating: Yup.number(),
  description: Yup.string().max(1000, "Limit exceeded"),
});

function CompleteAndReviews(props) {
  const { myTask, userInfo, setCompleted, handleClose } = props;
  const { RatingReviews, ratingResponse } = useRatingReviews();

  const initialValues = {
    rating: 0,
    description: "",
  };

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        RatingReviews(
          myTask?.delivered_order?.id,
          {
            rating: values.rating,
            comment: values.description,
          },
          handleClose
        );
      },
    });

  const handleRating = (index) => {
    setFieldValue("rating", index);
  };

  const [hoverRating, setHoverRating] = useState(0);
  // Handle mouse position to determine if hovering over left or right half of star
  const handleMouseMove = (e, starIndex) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;

    // If mouse is on the left half of the star, set to half star
    if (x < width / 2) {
      setHoverRating(starIndex - 0.5);
    } else {
      setHoverRating(starIndex);
    }
  };

  return (
    <div className="px-10">
      <h2 className="text-[#02174C] md:text-[18px] lg:text-[30px] font-[600] ">
        {userInfo?.user?.first_name}
      </h2>
      <p className="text-[#6F7487]">
        Give some feedback to tasker about your project
      </p>
      <h2 className="text-[#02174C] md:text-[14px] lg:text-[16px] font-[600] mt-3">
        Rate the pro
      </h2>
      <div className="mt-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((index) => {
            const activeRating = hoverRating || values.rating;

            // Determine if this star should be empty, half-filled, or full
            let fillPercent = 0;
            if (activeRating >= index) {
              fillPercent = 100; // Full star
            } else if (activeRating >= index - 0.5) {
              fillPercent = 50; // Half star
            }

            return (
              <div
                key={index}
                className="cursor-pointer w-8 h-8 relative"
                onClick={() => handleRating(hoverRating)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseEnter={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoverRating(0)}
              >
                {/* Empty star (background) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-full h-full absolute text-primary"
                >
                  <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.4h7.6L12 2z" />
                </svg>

                {/* Filled star (with clipPath for partial fill) */}
                {fillPercent > 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-full absolute text-primary"
                    style={{
                      clipPath:
                        fillPercent === 50
                          ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                          : "none",
                    }}
                  >
                    <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.4h7.6L12 2z" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        {errors.rating && touched.rating && (
          <p className="text-red-700 text-xs mt-1">{errors.rating}</p>
        )}
      </div>
      <div className="mt-5">
        <textarea
          placeholder="Write something"
          name="description"
          value={values.description}
          onChange={handleChange}
          className="w-full min-h-[150px] max-h-[150px] px-3 py-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
        ></textarea>
        {errors.description && touched.description && (
          <p className="text-red-700 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      {ratingResponse.loading ? (
        <div className="flex justify-end mt-5">
          <ButtonLoader2 />
        </div>
      ) : (
        <div className="flex justify-end mt-5 gap-2">
          <button
            onClick={() => setCompleted(false)}
            className="bg-transparent border w-[100px] h-[40px] border-gray-500 py-2 px-3 rounded-[4px] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={ratingResponse.loading}
            className="hover-slide-button flex justify-center items-center w-[220px] h-[40px] bg-primary text-secondary rounded-[4px] cursor-pointer"
          >
            Skip Review & Complete
          </button>
          <button
            onClick={handleSubmit}
            disabled={ratingResponse.loading}
            className="hover-slide-button flex justify-center items-center w-[220px] h-[40px] bg-secondary text-white rounded-[4px] cursor-pointer"
          >
            Submit Review & Complete
          </button>
        </div>
      )}
    </div>
  );
}
