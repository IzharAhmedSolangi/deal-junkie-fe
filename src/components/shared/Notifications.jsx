/* eslint-disable react-hooks/exhaustive-deps */
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import useNotifications from "../../services/common/useNotifications";
import GlobalContext from "../../context/GlobalContext";
import { ButtonLoader2 } from "./ButtonLoaders";
import ReconnectingWebSocket from "reconnecting-websocket";
import { getAccessToken } from "../../storage/storage";

const SOCKETS_URL = import.meta.env.VITE_SOCKETS_URL;

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
  }, [userInfo?.user?.role, isOpen]);

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

  // WebSocket connection
  const token = getAccessToken();
  const socketRef = useRef(null);
  const socketUrl = useMemo(
    () => `${SOCKETS_URL}/ws/notifications/?token=${token}`,
    [token]
  );

  // Connect to WebSocket
  const connectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    socketRef.current = new ReconnectingWebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket Connected");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        console.log({ response });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket Disconnected");
    };
  }, [socketUrl]);

  useEffect(() => {
    if (!token) return;
    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connectSocket]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        title="Notifications"
        className="flex justify-center items-center"
      >
        <IoIosNotificationsOutline
          className="w-7 h-7 text-gray-500 hover:text-primary cursor-pointer relative"
          onClick={() => setIsOpen(!isOpen)}
        />
      </button>
      {notifications.unread > 0 && (
        <div className="absolute w-[14px] h-[14px] rounded-full bg-primary top-0 right-0 text-secondary text-[10px] flex items-center justify-center">
          {notifications.unread}
        </div>
      )}
      {isOpen && (
        <div className="absolute right-0 mt-2 lg:w-[350px] xs:w-70 md:w-80 bg-white shadow-lg rounded-sm h-[400px] overflow-y-auto p-3">
          <h3 className="font-semibold text-lg">Notifications</h3>
          <ul className="mt-1">
            {notifications.data?.map((notification) => (
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
            {notifications.data?.length === 0 && (
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
