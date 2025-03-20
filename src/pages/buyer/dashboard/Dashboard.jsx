/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import MyTasks from "./components/MyTasks";
import EditProfile from "./components/EditProfile";
import Notifications from "./components/Notifications";
import ChangePassword from "./components/ChangePassword";
import ManagePayments from "./components/ManagePayments";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import {
  MdCameraAlt,
  MdEdit,
  MdOutlineDelete,
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";
import { FaUserXmark } from "react-icons/fa6";
import DeleteAccount from "../../../components/modals/DeleteAccount";
import DeactivateAccount from "../../../components/modals/DeactivateAccount";
import useUpload from "../../../services/common/useUpload";
import useEditProfile from "../../../services/common/useEditProfile";
import AppHead from "../../../seo/AppHead";

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
      <AppHead title="Dashboard - Deal Junkie" />
      <div className="bg-white w-full h-auto md:pb-40 pb-28 relative">
        <div className="w-full md:h-[320px] h-[260px] flex justify-center items-center">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Dashboard
          </h1>
        </div>
        <div className="lg:px-[80px] px-5 mt-5 flex lg:flex-row flex-col-reverse items-start gap-5">
          <div className="lg:w-[30%] w-full border border-[#02174C33] rounded-xl p-5 lg:sticky lg:top-[80px]">
            <Profile handleTabClick={handleTabClick} />
          </div>
          <div className="lg:w-[70%] w-full">
            <div className="flex md:gap-5 gap-2 border-b border-b-[#6F748729]">
              {tabs.map((item, index) => (
                <p
                  key={index}
                  className={`py-1 md:pe-5 pe-1 cursor-pointer text-[#6F7487] sm:text-[14px] xs:text-[10px] font-[500] hover:text-secondary ${
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
    </>
  );
}

export default Dashboard;

function Profile(props) {
  const { handleTabClick } = props;
  const { userInfo } = useContext(GlobalContext);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenDeactivateModal, setIsOpenDeactivateModal] = useState(false);
  const { Upload, upload } = useUpload();
  const { EditProfile } = useEditProfile();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    Upload({ image: file });
  };

  useEffect(() => {
    if (upload.url) {
      EditProfile({
        user: {
          profile_picture: upload.url,
        },
      });
    }
  }, [upload]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-full relative w-[120px] h-[120px]">
          {userInfo?.user?.profile_picture ? (
            <img
              className="w-full h-full object-cover rounded-full"
              src={`${userInfo?.user?.profile_picture}`}
              alt=""
            />
          ) : (
            <svg
              className="w-full h-full text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          )}
          {/* Camera Icon Overlay */}
          <label className="rounded-br-full rounded-bl-full absolute bottom-0 left-0 w-full text-secondary hover:text-primary flex justify-center items-center py-2 cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <MdCameraAlt className="text-[20px]" />
          </label>
        </div>
        <h1 className="font-semibold text-[22px] text-secondary mt-3">
          {userInfo?.user?.first_name} {userInfo?.user?.last_name}
        </h1>
        <div className="flex gap-1 mt-2">
          <MdOutlineLocationOn className="text-[#6F7487] text-[20px]" />
          <p className="font-normal text-[14px] text-[#6F7487] text-center">
            {userInfo?.user?.street}
          </p>
        </div>
        <div className="flex gap-1 mt-2">
          <MdOutlineMail className="text-[#6F7487] text-[20px]" />
          <p className="font-normal text-[14px] text-[#6F7487]">
            {userInfo?.user?.email}
          </p>
        </div>
        <div className="flex gap-1 mt-2">
          <MdPhoneAndroid className="text-[#6F7487] text-[20px]" />
          <p className="font-normal text-[14px] text-[#6F7487]">
            {userInfo?.user?.phone_number}
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
      <DeleteAccount
        icon="/assets/icons/icon-3.png"
        title="Are you sure you want to delete your profile?"
        description="Your delete request will be submitted to admin and your profile will be deleted permanently once approved from admin."
        url="/api/accounts/delete-my-account/"
        isOpenModal={isOpenDeleteModal}
        setIsOpenModal={setIsOpenDeleteModal}
      />
      <DeactivateAccount
        title="Tell us why do you want to deactivate your profile"
        description="Your deactivate request will be submitted to admin and your profile will be deactivated once approved from admin. You can re-active anytime by contacting admin."
        url={`/api/accounts/user/${userInfo?.user?.id}/deactivate/`}
        isOpenModal={isOpenDeactivateModal}
        setIsOpenModal={setIsOpenDeactivateModal}
      />
    </>
  );
}
