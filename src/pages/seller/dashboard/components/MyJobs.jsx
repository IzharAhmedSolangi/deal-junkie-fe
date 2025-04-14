/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Dropdown from "../../../../components/shared/Dropdown";
import { CiCalendar, CiTimer } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import useGetMyTasks from "../../../../services/seller/useGetMyTasks";
import ShowMessage from "../../../../components/shared/ShowMessage";
import { ButtonLoader3 } from "../../../../components/shared/ButtonLoaders";
import { TiTick } from "react-icons/ti";
import { TruncateText } from "../../../../utils/TruncateText";
import MarkAsComplete from "../../../../components/modals/MarkAsComplete";
import MyTaskDetailsModal from "./MyTaskDetailsModal";

const Tasks = [
  { name: "All Jobs", value: 1 },
  { name: "Completed", value: 2 },
  { name: "Cancelled", value: 3 },
  { name: "In Progress", value: 4 },
];

function MyJobs() {
  const { GetMyTasks, myTasks, setMyTasks } = useGetMyTasks();
  const [selectedTaskFilter, setSelectedTaskFilter] = useState(Tasks[0]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOpenTaskDetailsModal, setIsOpenTaskDetailsModal] = useState(false);
  const [isOpenSubmitTaskModal, setIsOpenSubmitTaskModal] = useState(false);

  useEffect(() => {
    GetMyTasks(1, false, selectedTaskFilter?.name);
  }, [selectedTaskFilter]);

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

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-[30px] text-secondary">My Jobs</h1>
        <div className="min-w-[150px]">
          <Dropdown
            placeholder="Select Job"
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
      <div className="w-full mt-5 flex flex-col gap-5">
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
                      <CiCalendar />
                      {item.expected_completion_date}
                    </div>
                    <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                      <CiTimer />
                      11:59 PM
                    </div>
                  </div>
                  {item.status === "Completed" && (
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
                    <IoEyeOutline />
                    See Details
                  </button>
                  {item.status === "In Progress" && (
                    <button
                      className="bg-[#0AF8860D] w-full h-[35px] border border-primary rounded-sm text-primary text-[13px] cursor-pointer flex justify-center items-center"
                      onClick={() => {
                        setIsOpenSubmitTaskModal(true);
                        setSelectedTask(item);
                      }}
                    >
                      <TiTick />
                      Complete As Complete
                    </button>
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
          <div className="flex justify-center items-center w-full md:h-[200px] h-[150px]">
            <ButtonLoader3 />
          </div>
        )}
        {!myTasks.loading && myTasks.message && (
          <div className="flex justify-center items-center w-full md:h-[200px] h-[150px]">
            <ShowMessage title={myTasks.message} />
          </div>
        )}
      </div>

      <MarkAsComplete
        isOpenModal={isOpenSubmitTaskModal}
        setIsOpenModal={setIsOpenSubmitTaskModal}
        selected={selectedTask}
      />
      <MyTaskDetailsModal
        isOpenModal={isOpenTaskDetailsModal}
        setIsOpenModal={setIsOpenTaskDetailsModal}
        selected={selectedTask}
        setSelected={setSelectedTask}
      />
    </>
  );
}

export default MyJobs;
