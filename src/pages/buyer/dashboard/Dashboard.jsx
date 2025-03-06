/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/shared/Layout";
import MyTasks from "./components/MyTasks";
import EditProfile from "./components/EditProfile";
import Notifications from "./components/Notifications";
import ChangePassword from "./components/ChangePassword";
import ManagePayments from "./components/ManagePayments";
import { useContext, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import {
  MdEdit,
  MdOutlineDelete,
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";
import { FaUserXmark } from "react-icons/fa6";
import Delete from "../../../components/modals/Delete";
import Deactivate from "../../../components/modals/Deactivate";

const tabs = [
  { name: "My Task", path: "my-tasks" },
  { name: "Change Password", path: "change-password" },
  { name: "Manage Payments", path: "manage-payments" },
  { name: "Notifications", path: "notifications" },
];
function Dashboard() {
  const { tabName } = useParams();
  const Naviagte = useNavigate();

  const handleTabClick = (tabName) => {
    Naviagte(`/dashboard/${tabName}`);
  };
  return (
    <>
      <Layout>
        <div className="bg-white w-full h-auto pt-[70px] pb-40 relative">
          <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
          <h1 className="font-[700] text-[48px] text-center text-secondary mt-4">
            Dashboard
          </h1>
          <div className="px-[100px] mt-32 flex items-start gap-5">
            <div className="w-[30%] border border-[#02174C33] rounded-xl p-5 sticky top-[80px]">
              <Profile handleTabClick={handleTabClick} />
            </div>
            <div className="w-[70%]">
              <div className="flex gap-5 border-b border-b-[#6F748729]">
                {tabs.map((item, index) => (
                  <p
                    key={index}
                    className={`py-1 pe-5 cursor-pointer text-[#6F7487] text-[14px] font-[500] hover:text-secondary ${
                      tabName === item.path
                        ? "border-b-[2px] border-b-secondary text-secondary font-[600]"
                        : ""
                    }`}
                    onClick={() => handleTabClick(item.path)}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
              <div className="mt-5">
                {tabName === "my-tasks" && <MyTasks />}
                {tabName === "change-password" && <ChangePassword />}
                {tabName === "manage-payments" && <ManagePayments />}
                {tabName === "notifications" && <Notifications />}
                {tabName === "edit-profile" && <EditProfile />}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;

function Profile(props) {
  const { handleTabClick } = props;
  const { userInfo } = useContext(GlobalContext);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenDeactivateModal, setIsOpenDeactivateModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {userInfo?.profile_avatar ? (
          <img
            className="rounded-full w-[120px] h-[120px] object-cover"
            src={`${userInfo?.profile_avatar}`}
            alt=""
          />
        ) : (
          <svg
            className="w-[120px] h-[120px] text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        )}
        <h1 className="font-semibold text-[22px] text-secondary mt-3">
          Sarah Taylor
        </h1>
        <div className="flex gap-1 mt-2">
          <MdOutlineLocationOn className="text-[#6F7487] text-[20px]" />
          <p className="font-normal text-[14px] text-[#6F7487]">
            3401 Walnut St, Philadelphia 19104, Pennsylvania, United States
          </p>
        </div>
        <div className="flex gap-1 mt-2">
          <MdOutlineMail className="text-[#6F7487] text-[20px]" />
          <p className="font-normal text-[14px] text-[#6F7487]">
            test@gmail.com
          </p>
        </div>
        <div className="flex gap-1 mt-2">
          <MdPhoneAndroid className="text-[#6F7487] text-[20px]" />
          <p className="font-normal text-[14px] text-[#6F7487]">
            +923001234567
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-2 w-full">
          <button
            className="bg-secondary border border-secondary cursor-pointer hover:opacity-80 w-full h-[45px] text-white rounded flex justify-center items-center gap-2"
            onClick={() => handleTabClick("edit-profile")}
          >
            <MdEdit className="text-[20px]" />
            Edit Profile
          </button>
          <button
            className="bg-[#EAB8510F] border border-[#EAB851] cursor-pointer hover:opacity-80 w-full h-[45px] text-[#EAB851] rounded flex justify-center items-center gap-2"
            onClick={() => setIsOpenDeactivateModal(true)}
          >
            <FaUserXmark className="text-[20px]" />
            Deactivate My Account
          </button>
          <button
            className="bg-[#EA51670F] border border-[#EA5167] cursor-pointer hover:opacity-80 w-full h-[45px] text-[#EA5167] rounded flex justify-center items-center gap-2"
            onClick={() => setIsOpenDeleteModal(true)}
          >
            <MdOutlineDelete className="text-[20px]" />
            Delete My Account
          </button>
        </div>
      </div>
      <Delete
        icon="/assets/icons/icon-3.png"
        title="Are you sure you want to delete your profile?"
        description="Your delete request will be submitted to admin and your profile will be deleted permanently once approved from admin."
        url="/api/accounts/delete/"
        isOpenModal={isOpenDeleteModal}
        setIsOpenModal={setIsOpenDeleteModal}
      />
      <Deactivate
        title="Tell us why do you want to deactivate your profile"
        description="Your deactivate request will be submitted to admin and your profile will be deactivated once approved from admin. You can re-active anytime by contacting admin."
        url="/api/accounts/deactivate/"
        isOpenModal={isOpenDeactivateModal}
        setIsOpenModal={setIsOpenDeactivateModal}
      />
    </>
  );
}
