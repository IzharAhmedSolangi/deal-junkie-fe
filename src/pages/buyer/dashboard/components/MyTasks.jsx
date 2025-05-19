/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Dropdown from "../../../../components/shared/Dropdown";
import { CiCalendar, CiTimer } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import useGetMyTasks from "../../../../services/buyer/useGetMyTasks";
import { ButtonLoader3 } from "../../../../components/shared/ButtonLoaders";
import ShowMessage from "../../../../components/shared/ShowMessage";
import MyTaskDetailsModal from "./MyTaskDetailsModal";
import GlobalContext from "../../../../context/GlobalContext";
import { TruncateText } from "../../../../utils/TruncateText";
import CancelTask from "../../../../components/modals/CancelTask";
import JobCard from "../../../../components/skeltons/JobCard";

const Tasks = [
  { name: "All Tasks", value: 1 },
  { name: "Completed", value: 2 },
  { name: "Delivered", value: 3 },
  { name: "Cancelled", value: 4 },
  { name: "In Progress", value: 5 },
  { name: "Receiving Offer", value: 6 },
  { name: "Hold", value: 6 },
];

function MyTasks() {
  const { GetMyTasks, myTasks, setMyTasks } = useGetMyTasks();
  const { updateResponse } = useContext(GlobalContext);
  const [selectedTaskFilter, setSelectedTaskFilter] = useState(Tasks[0]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOpenTaskDetailsModal, setIsOpenTaskDetailsModal] = useState(false);
  const [isOpenCancelTaskModal, setIsOpenCancelTaskModal] = useState(false);

  useEffect(() => {
    GetMyTasks(1, false, selectedTaskFilter?.name);
  }, [updateResponse, selectedTaskFilter]);

  const handleLoadMore = () => {
    if (myTasks.currentPage < myTasks.totalPages) {
      setMyTasks((prevState) => ({
        ...prevState,
        loading: true,
      }));
      const nextPage = myTasks.currentPage + 1;
      GetMyTasks(nextPage, true, selectedTaskFilter?.name);
    }
  };

  const handleCancelTask = (taskId) => {
    setSelectedTask(taskId);
    setIsOpenCancelTaskModal(true);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-[30px] text-secondary">My Tasks</h1>
        <div className="min-w-[150px]">
          <Dropdown
            placeholder="Select Task"
            options={Tasks}
            selected={selectedTaskFilter}
            onChange={(option) => {
              setMyTasks((prevState) => ({
                ...prevState,
                loading: true,
                data: null,
                message: null,
                totalPages: 1,
                currentPage: 1,
              }));
              setSelectedTaskFilter(option);
            }}
          />
        </div>
      </div>
      {!myTasks.loading && (
        <div className="w-full mt-5 flex flex-col gap-5">
          {myTasks.data?.map((item, index) => (
            <div
              key={index}
              className="border border-[#15202712] rounded-[10px] shadow-md w-full h-auto md:p-3 p-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                    <CiCalendar className="flex-shrink-0" />
                    {item.expected_completion_date}
                  </div>
                  <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                    <CiTimer className="flex-shrink-0" />
                    11:59 PM
                  </div>
                </div>
                {item.status === "Delivered" && (
                  <div className="px-2 py-1 shadow-sm rounded-sm bg-primary text-white text-[12px] font-[700]">
                    {item.status}
                  </div>
                )}
                {item.status === "Receiving Offer" && (
                  <div className="px-2 py-1 shadow-sm rounded-sm bg-secondary text-white text-[12px] font-[700]">
                    {item.status}
                  </div>
                )}
                {item.status === "In Progress" && (
                  <div className="px-2 py-1 shadow-sm rounded-sm bg-primary text-white text-[12px] font-[700]">
                    {item.status}
                  </div>
                )}
                {item.status === "Cancelled" && (
                  <div className="px-2 py-1 shadow-sm rounded-sm bg-[#D92D20] text-white text-[12px] font-[700]">
                    {item.status}
                  </div>
                )}
              </div>
              <h1 className="text-[#222222] md:text-[20px] text-[16px] font-[600] mt-3">
                {item.title}
              </h1>
              <p className="text-[#98A2B3] md:text-[16px] text-[12px] mt-1">
                {TruncateText(item.description)}
              </p>
              <div className="flex items-center gap-1 mt-3">
                <button
                  onClick={() => {
                    setSelectedTask(item);
                    setIsOpenTaskDetailsModal(true);
                  }}
                  className="bg-[#51B8EA0F] w-full h-[35px] border border-[#2D9ACF] rounded-sm text-[#2D9ACF] text-[13px] cursor-pointer flex justify-center items-center gap-1"
                >
                  <IoEyeOutline className="flex-shrink-0" />
                  See Details
                </button>

                {item.status === "Receiving Offer" && (
                  <>
                    {/* <button className="bg-[#AF2DCF0F] w-full h-[35px] border border-[#AF2DCF] rounded-sm text-[#AF2DCF] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                      <PiCurrencyDollarBold />
                      Update Price
                    </button> */}
                    <button
                      className="bg-[#EA51670F] w-full h-[35px] border border-[#EA5167] rounded-sm text-[#EA5167] text-[13px] cursor-pointer flex justify-center items-center gap-1"
                      onClick={() => handleCancelTask(item)}
                    >
                      <IoMdClose className="flex-shrink-0" />
                      Cancel Task
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {myTasks.currentPage < myTasks.totalPages && !myTasks.loading && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-primary text-secondary py-2 px-6 rounded-md cursor-pointer"
            onClick={handleLoadMore}
            disabled={myTasks.loading}
          >
            See More
          </button>
        </div>
      )}
      {myTasks.data && myTasks.loading && (
        <div className="w-full flex justify-center mt-2">
          <ButtonLoader3 />
        </div>
      )}
      {!myTasks.data && myTasks.loading && (
        <div className="w-full mt-5 flex flex-col gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <JobCard key={index} />
          ))}
        </div>
      )}
      {!myTasks.loading && myTasks.message && (
        <div className="flex justify-center items-center w-full md:h-[200px] h-[150px]">
          <ShowMessage title={myTasks.message} />
        </div>
      )}
      <MyTaskDetailsModal
        selected={selectedTask}
        setSelected={setSelectedTask}
        isOpenModal={isOpenTaskDetailsModal}
        setIsOpenModal={setIsOpenTaskDetailsModal}
      />
      <CancelTask
        icon="/assets/icons/icon-3.png"
        title="You’re about to cancel your task"
        description="If you cancel task, your payment will be deducted and this action can’t be undone."
        url={`/api/buyer/project/${selectedTask?.id}/cancel/`}
        isOpenModal={isOpenCancelTaskModal}
        setIsOpenModal={setIsOpenCancelTaskModal}
      />
    </>
  );
}

export default MyTasks;
