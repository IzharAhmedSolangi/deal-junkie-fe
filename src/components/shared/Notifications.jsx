/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ButtonLoader2 } from "./ButtonLoaders";

function Notifications(props) {
  const { notifications, unreadNotifications, sendToSocket } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      <button
        title="Notifications"
        className="flex justify-center items-center"
      >
        <IoIosNotificationsOutline
          className="w-7 h-7 text-gray-500 hover:text-primary cursor-pointer relative"
          onClick={() => {
            setIsOpen(!isOpen);
            sendToSocket("mark_as_read", "notifications");
          }}
        />
      </button>
      {unreadNotifications > 0 && (
        <div className="absolute w-[14px] h-[14px] rounded-full bg-primary top-[-3px] right-[-3px] text-secondary text-[10px] flex items-center justify-center">
          {unreadNotifications}
        </div>
      )}
      {isOpen && (
        <div className="absolute right-0 mt-2 lg:w-[350px] xs:w-70 md:w-80 bg-white shadow-lg rounded-sm h-[400px] overflow-y-auto p-3">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <ul className="mt-1">
            {notifications?.map((notification) => (
              <li
                key={notification.id}
                className="py-1 flex items-start justify-between"
              >
                <div className="flex items-start gap-[6px] w-[70%]">
                  <FaUserCircle className="text-[25px] text-gray-300 flex-shrink-0" />
                  <h6 className="text-[#6F7487] md:text-[13px] text-[11px]">
                    {notification.message}
                  </h6>
                </div>
                <p className="text-[12px] text-[#6F7487]">
                  {showTimeOrDate(notification.created_at)}
                </p>
              </li>
            ))}
            {notifications.length === 0 && (
              <div className="w-full h-[300px] flex justify-center items-center">
                No notifications
              </div>
            )}
            {notifications.loading && (
              <div className="w-full h-[300px] flex justify-center items-center">
                <ButtonLoader2 />
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notifications;
