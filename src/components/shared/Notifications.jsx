/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import useNotifications from "../../services/common/useNotifications";
import GlobalContext from "../../context/GlobalContext";
function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userInfo } = useContext(GlobalContext);

  const { GetNotifications, notifications } = useNotifications();

  useEffect(() => {
    if (userInfo?.user?.role === "admin") {
      GetNotifications(`/api/admin/notifications/`);
    } else if (userInfo?.user?.role === "buyer") {
      GetNotifications(`/api/buyer/notifications/`);
    } else if (userInfo?.user?.role === "seller") {
      GetNotifications(`/api/seller/notifications/`);
    }
  }, [userInfo?.user?.role]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const showTimeOrDate = (created_at) => {
    const createdAt = new Date(created_at);
    const now = new Date();
    const diffInSeconds = Math.floor((now - createdAt) / 1000);
    let timeLabel;

    if (diffInSeconds < 60) {
      timeLabel = "Just now";
    } else if (diffInSeconds < 3600) {
      timeLabel = `${Math.floor(diffInSeconds / 60)} mins ago`;
    } else if (createdAt.toDateString() === now.toDateString()) {
      timeLabel = "Today";
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (createdAt.toDateString() === yesterday.toDateString()) {
        timeLabel = "Yesterday";
      } else {
        timeLabel = createdAt.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      }
    }

    return timeLabel;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <IoIosNotificationsOutline
        className="w-7 h-7 text-gray-500 cursor-pointer relative"
        onClick={() => setIsOpen(!isOpen)}
      />
      {notifications.unread && (
        <div className="absolute w-[14px] h-[14px] rounded-full bg-primary top-0 right-0 text-white text-[10px] flex items-center justify-center">
          {notifications.unread}
        </div>
      )}
      {isOpen && (
        <div className="absolute right-0 mt-2 lg:w-[350px] w-80 bg-white shadow-lg rounded-sm h-[400px] overflow-y-auto p-3">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <ul className="mt-1">
            {notifications.data?.map((notification) => (
              <li
                key={notification.id}
                className="py-1 flex items-center justify-between"
              >
                <div className="flex items-center gap-[6px] w-[70%]">
                  <FaUserCircle className="text-[30px] text-gray-300" />
                  <h6 className="text-[#6F7487] text-[14px]">
                    {notification.message}
                  </h6>
                </div>
                <p className="text-[12px] text-[#6F7487]">
                  {showTimeOrDate(notification.created_at)}
                </p>
              </li>
            ))}

            {/* <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                Pay <span className="font-semibold">$234 to Susan Smith</span>{" "}
                as task is completed.
                <div className="flex gap-2 mt-1">
                  <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded">
                    Accept
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white text-sm rounded">
                    Reject
                  </button>
                </div>
                <p className="text-sm text-gray-500">5 mins ago</p>
              </div>
            </li>

            <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                Payment is sent to{" "}
                <span className="font-semibold">Robert Davis</span>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </li>

            <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                <span className="font-semibold">Karen Miller</span> sent you a
                text message.
                <p className="text-sm text-gray-500">10 Jun 2023</p>
              </div>
            </li>

            <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                <span className="font-semibold">Ralph Edwards</span> has
                refunded your amount.
                <p className="text-sm text-gray-500">10 Jun 2023</p>
              </div>
            </li>

            <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-500" />
              <div>
                Your task has been deleted.
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </li>
            {[...Array(3)].map((_, index) => (
              <li
                key={index}
                className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer"
              >
                <FaUserCircle className="w-8 h-8 text-gray-500" />
                <div>
                  <span className="font-semibold">User {index + 1}</span> sent
                  you a message.
                  <p className="text-sm text-gray-500">{index + 1} days ago</p>
                </div>
              </li>
            ))} */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notifications;
