import { useState } from "react";
import Dropdown from "../../../../components/shared/Dropdown";
import { CiCalendar, CiTimer } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";

const Tasks = [
  { name: "All Tasks", value: 1 },
  { name: "Completed", value: 2 },
  { name: "Cancelled", value: 3 },
  { name: "In Process", value: 4 },
  { name: "Receiving Offers", value: 5 },
];

function MyTasks() {
  const [selectedTask, setSelectedTask] = useState(Tasks[0]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-[30px] text-secondary">My Tasks</h1>
        <div className="min-w-[150px]">
          <Dropdown
            placeholder="Select Task"
            options={Tasks}
            selected={selectedTask}
            onChange={(option) => {
              setSelectedTask(option);
            }}
          />
        </div>
      </div>
      <div className="w-full mt-5 flex flex-col gap-5">
        {Array.from({ length: 10 }).map((item, index) => (
          <div
            key={index}
            className="border border-[#15202712] rounded-[10px] shadow-md w-full h-[200px] p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                  <CiCalendar />
                  July 25, 2025
                </div>
                <div className="flex items-center gap-[2px] text-[#98A2B3] text-[14px] font-[500]">
                  <CiTimer />
                  3:30PM
                </div>
              </div>
              <div className="px-2 py-1 shadow-sm rounded-sm bg-secondary text-white text-[12px] font-[700]">
                RECEIVING OFFERS
              </div>
            </div>
            <h1 className="text-[#222222] text-[20px] font-[600] mt-3">
              Seeking skilled contractors for home improvement project
            </h1>
            <p className="text-[#98A2B3] text-[16px] mt-1">
              Its not always easy to do whats not popular, but thats where you
              make your money. Its not always easy to do whats not popular, but
              thats where you make your money.
            </p>
            <div className="flex items-center gap-1 mt-3">
              <button className="bg-[#51B8EA0F] w-full h-[35px] border border-[#2D9ACF] rounded-sm text-[#2D9ACF] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                <IoEyeOutline />
                See Details
              </button>
              <button className="bg-[#AF2DCF0F] w-full h-[35px] border border-[#AF2DCF] rounded-sm text-[#AF2DCF] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                <PiCurrencyDollarBold />
                Update Price
              </button>
              <button className="bg-[#EA51670F] w-full h-[35px] border border-[#EA5167] rounded-sm text-[#EA5167] text-[13px] cursor-pointer flex justify-center items-center gap-1">
                <IoMdClose />
                Cancel Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyTasks;
