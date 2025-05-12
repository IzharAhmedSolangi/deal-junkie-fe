/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { FaChevronLeft, FaFile } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { CiSearch, CiVideoOn } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
import { MdFileDownload, MdOutlineAttachment } from "react-icons/md";
import { getAccessToken } from "../../storage/storage";
import ReconnectingWebSocket from "reconnecting-websocket";
import GlobalContext from "../../context/GlobalContext";
import { useLocation } from "react-router-dom";
import AppHead from "../../seo/AppHead";
import useUpload from "../../services/common/useUpload";
import { ButtonLoader2 } from "../../components/shared/ButtonLoaders";
import useDownload from "../../services/common/useDownload";

// Constants moved outside component
const BASE_URL = import.meta.env.VITE_API_URL;
const SOCKETS_URL = import.meta.env.VITE_SOCKETS_URL;

// File type configurations for better maintenance
const FILE_TYPES = {
  image: ["jpeg", "png", "jpg", "ico", "jfif"],
  audio: ["mp3"],
  video: ["mp4"],
  pdf: ["pdf"],
  document: ["rar", "zip", "docx", "doc", "txt"],
};

// Utility functions moved outside component
const useQuery = () => new URLSearchParams(useLocation().search);

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown Date";

  try {
    const formattedTimestamp = timestamp.replace(" ", "T");
    const date = new Date(formattedTimestamp);

    if (isNaN(date.getTime())) return "Unknown Date";

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const dateStr = date.toISOString().split("T")[0];
    const todayStr = today.toISOString().split("T")[0];
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (dateStr === todayStr) return "Today";
    if (dateStr === yesterdayStr) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Unknown Date";
  }
};

// Extract file information from message URL
const getFileInfo = (message) => {
  if (!message?.includes(BASE_URL)) return null;

  const urlParts = message.split("/");
  const fileName = decodeURIComponent(urlParts[urlParts.length - 1]);
  const fileType = fileName.split(".").pop();

  return { fileName, fileType };
};

// Chat message subcomponent
const ChatMessage = ({ message, isCurrentUser, userId }) => {
  const fileInfo = getFileInfo(message.message);
  const isFile = !!fileInfo;
  const [showDownload, setShowDownload] = useState(false);
  const { Download, loading } = useDownload();

  const handleDownload = (fileName) => {
    Download(fileName);
  };

  return (
    <div
      className={`flex relative ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {isFile ? (
        <FileContent
          fileInfo={fileInfo}
          message={message.message}
          handleDownload={handleDownload}
          showDownload={showDownload}
          setShowDownload={setShowDownload}
        />
      ) : (
        <div
          className={`p-3 my-3 rounded-lg max-w-[75%] break-words mb-5 ${
            isCurrentUser
              ? "bg-[#003F63] text-white rounded-xl rounded-br-none"
              : "bg-[#FAFAFA] text-black rounded-xl rounded-bl-none"
          }`}
        >
          {message.message}
        </div>
      )}
      <span className="text-[10px] text-gray-500 absolute bottom-0">
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
};

// File content subcomponent
const FileContent = ({
  fileInfo,
  message,
  handleDownload,
  showDownload,
  setShowDownload,
}) => {
  if (!fileInfo) return null;
  const { fileName, fileType } = fileInfo;

  if (FILE_TYPES.image.includes(fileType)) {
    return (
      <div
        className="bg-gray-300 p-1 rounded mb-5 my-3 relative"
        onMouseEnter={() => setShowDownload(true)}
        onMouseLeave={() => setShowDownload(false)}
      >
        <img
          src={message}
          alt={fileName}
          className="w-full max-w-[300px] h-auto object-contain"
        />
        {showDownload && (
          <button
            className="absolute top-2 right-2 rounded-full w-8 h-8 flex justify-center items-center bg-gray-800 bg-opacity-70 text-white cursor-pointer hover:bg-opacity-90"
            onClick={() => handleDownload(fileName)}
            title="Download image"
          >
            <MdFileDownload size={20} />
          </button>
        )}
      </div>
    );
  }

  if (FILE_TYPES.video.includes(fileType)) {
    return (
      <div
        className="bg-gray-300 p-1 rounded mb-5 my-3 relative"
        onMouseEnter={() => setShowDownload(true)}
        onMouseLeave={() => setShowDownload(false)}
      >
        <video controls className="w-full max-w-[300px] h-full">
          <source src={message} type="video/webm" />
        </video>
        {showDownload && (
          <button
            className="absolute top-2 right-2 rounded-full w-8 h-8 flex justify-center items-center bg-gray-800 bg-opacity-70 text-white cursor-pointer hover:bg-opacity-90"
            onClick={() => handleDownload(fileName)}
            title="Download video"
          >
            <MdFileDownload size={20} />
          </button>
        )}
      </div>
    );
  }

  if (FILE_TYPES.audio.includes(fileType)) {
    return (
      <div
        className="bg-gray-300 p-1 rounded mb-5 my-3 relative"
        onMouseEnter={() => setShowDownload(true)}
        onMouseLeave={() => setShowDownload(false)}
      >
        <audio controls className="w-full max-w-[300px]">
          <source src={message} type="audio/mp3" />
        </audio>
        {showDownload && (
          <button
            className="absolute top-2 right-2 rounded-full w-8 h-8 flex justify-center items-center bg-gray-800 bg-opacity-70 text-white cursor-pointer hover:bg-opacity-90"
            onClick={() => handleDownload(fileName, message)}
            title="Download audio"
          >
            <MdFileDownload size={20} />
          </button>
        )}
      </div>
    );
  }

  if (FILE_TYPES.pdf.includes(fileType)) {
    return (
      <div className="bg-gray-300 p-1 rounded mb-5 my-3">
        <iframe
          title="PDF Viewer"
          src={message}
          frameBorder={0}
          className="h-[300px] w-full max-w-[300px]"
        />
      </div>
    );
  }

  if (FILE_TYPES.document.includes(fileType)) {
    return (
      <div className="bg-gray-300 p-1 rounded mb-5 my-3">
        <div className="flex items-center px-3 py-2">
          <FaFile />
          <span className="ml-2 text-sm text-gray-800 truncate max-w-[200px]">
            {fileName}
          </span>
          <button
            className="rounded-full w-[22px] h-[22px] flex justify-center items-center border border-gray-500 text-gray-500 cursor-pointer ml-3 hover:border-secondary hover:text-secondary"
            onClick={() => handleDownload(fileName)}
          >
            <MdFileDownload />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 p-1 rounded mb-5 my-3">
      <div className="flex items-center px-3 py-2">
        <FaFile />
        <span className="ml-2 text-sm text-gray-800 truncate max-w-[200px]">
          {fileName}
        </span>
        <button
          className="rounded-full w-[22px] h-[22px] flex justify-center items-center border border-gray-500 text-gray-500 cursor-pointer ml-3 hover:border-secondary hover:text-secondary"
          onClick={() => handleDownload(fileName)}
        >
          <MdFileDownload />
        </button>
      </div>
    </div>
  );
};

// User list item subcomponent
const UserListItem = ({ user, selectedUserId, userInfo, onSelect }) => {
  const lastMessage = user.messages[user.messages.length - 1] || {};
  const isCurrentUserSender = lastMessage.sender_id === userInfo?.user?.id;

  const getMessagePreview = (message) => {
    if (!message) return "";
    const isFile = message.includes(BASE_URL);
    if (isFile)
      return isCurrentUserSender
        ? "Me: Sent an attachment"
        : "Received an attachment";
    return isCurrentUserSender
      ? `Me: ${message.slice(0, 25)}${message.length > 25 ? "..." : ""}`
      : `${message.slice(0, 25)}${message.length > 25 ? "..." : ""}`;
  };

  return (
    <div
      className={`flex relative items-center py-3 px-3 border-t-[0.5px] border-t-[#02174C33] cursor-pointer ${
        selectedUserId === user.chat_with
          ? "bg-blue-50"
          : "hover:bg-[#0AF8860F]"
      }`}
      onClick={() => onSelect(user)}
    >
      <div className="h-[40px] w-[40px] rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-white">
        {user.username.charAt(0).toUpperCase()}
      </div>
      <div className="ml-2 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-[600] text-[16px] text-[#003F63] truncate">
            {user.username}
          </h3>
        </div>
        <p className="font-[400] text-[12px] text-[#6F7487] truncate">
          {getMessagePreview(lastMessage.message)}
        </p>
      </div>
      <p className="font-[500] text-[12px] text-[#6F7487] whitespace-nowrap ml-2">
        {formatTime(lastMessage.timestamp)}
      </p>
    </div>
  );
};

// Main component
function Inbox() {
  const query = useQuery();
  const token = getAccessToken();
  const { userInfo } = useContext(GlobalContext);

  // Parse userId and username from URL
  const userId = parseInt(query.get("userId")) || null;
  const username = query.get("username") || null;

  // State management
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    chat_with: userId,
    username: username,
  });
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // File upload
  const fileInputRef = useRef(null);
  const { Upload, upload } = useUpload();

  // WebSocket connection
  const socketRef = useRef(null);
  const socketUrl = useMemo(
    () =>
      `${SOCKETS_URL}/ws/chat/?partner_id=${selectedUser?.chat_with}&token=${token}`,
    [selectedUser?.chat_with, token]
  );

  // Group messages by date
  const groupedMessages = useMemo(() => {
    return messages
      .slice()
      .sort(
        (a, b) =>
          new Date(a.timestamp.replace(" ", "T")) -
          new Date(b.timestamp.replace(" ", "T"))
      )
      .reduce((acc, message) => {
        const dateKey = formatDate(message.timestamp);
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(message);
        return acc;
      }, {});
  }, [messages]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowSidebar(selectedUser?.chat_with ? false : true);
      } else {
        setShowSidebar(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [selectedUser?.chat_with]);

  // Scrolls chat to bottom
  const scrollToBottom = useCallback(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  // Connect to WebSocket
  const connectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    socketRef.current = new ReconnectingWebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket Connected");
      setLoading(false);
    };

    socketRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        setLoading(false);

        if (response.message) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: response.message,
              sender_id: response.sender_id,
              receiver_id: response.receiver_id,
              timestamp: new Date()
                .toISOString()
                .replace("T", " ")
                .slice(0, 19),
            },
          ]);
          setTimeout(scrollToBottom, 100);
        }

        if (response.users_chat_list) {
          setUsers(response.users_chat_list);

          if (userId) {
            const user = response.users_chat_list.find(
              (item) => item.chat_with === selectedUser.chat_with
            );
            if (user) {
              setMessages(user.messages);
              setTimeout(scrollToBottom, 100);
            }
          }
        }
      } catch (error) {
        setLoading(false);
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onerror = (error) => {
      setLoading(false);
      console.error("WebSocket Error:", error);
    };

    socketRef.current.onclose = () => {
      setLoading(false);
      console.log("WebSocket Disconnected");
    };
  }, [socketUrl, userId, selectedUser.chat_with, scrollToBottom]);

  // Send message through WebSocket
  const sendToSocket = useCallback(
    (message) => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        const payload = JSON.stringify({
          message: message,
          receiver_id: selectedUser?.chat_with,
        });
        socketRef.current.send(payload);
        setTimeout(scrollToBottom, 100);
      } else {
        console.error("WebSocket not open");
        // Attempt to reconnect
        connectSocket();
        // Queue message to be sent after connection (could implement a message queue here)
      }
    },
    [selectedUser?.chat_with, connectSocket, scrollToBottom]
  );

  // Handle sending a message
  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMessage.trim() || !selectedUser?.chat_with) return;

      const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

      // Optimistic update
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(),
          message: newMessage,
          receiver_id: selectedUser?.chat_with,
          sender_id: userInfo?.user?.id,
          timestamp,
        },
      ]);

      sendToSocket(newMessage);
      setNewMessage("");
    },
    [newMessage, selectedUser?.chat_with, userInfo?.user?.id, sendToSocket]
  );

  // Handle file upload
  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        Upload({ image: file });
      }
    },
    [Upload]
  );

  // Handle file button click
  const handleFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Handle user selection
  const handleUserSelect = useCallback((user) => {
    setSelectedUser(user);
    setMessages(user.messages || []);

    // On mobile, hide sidebar after selecting a user
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  }, []);

  // Handle back button click (for mobile)
  const handleBackToList = useCallback(() => {
    setShowSidebar(true);
  }, []);

  // Connect to WebSocket when selectedUser changes
  useEffect(() => {
    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connectSocket]);

  // Handle file upload completion
  useEffect(() => {
    if (upload.url && selectedUser?.chat_with) {
      sendToSocket(upload.url);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(),
          message: upload.url,
          receiver_id: selectedUser?.chat_with,
          sender_id: userInfo?.user?.id,
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
        },
      ]);
    }
  }, [upload.url, selectedUser?.chat_with, userInfo?.user?.id, sendToSocket]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const location = useLocation();

  return (
    <>
      <AppHead title="Inbox - Deal Junkie" />
      <div className="w-full h-auto bg-white">
        <div
          className={`w-full ${
            location.pathname === "/admin/inbox"
              ? "h-[calc(100vh-60px)] p-5"
              : "h-[calc(100vh-60px)] mt-[60px]"
          }`}
        >
          <div className="w-full h-full bg-white border-[0.5px] border-[#02174C33] flex">
            {/* Chat Sidebar - Conditionally shown on mobile */}
            {showSidebar && (
              <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col border-r-[0.5px] border-r-[#02174C33]">
                <div className="w-full h-[60px] md:h-[80px] px-3 flex items-center">
                  <div className="w-full border border-[#02174C33] flex items-center px-2 rounded-sm">
                    <CiSearch className="w-5 h-5 text-gray-500" />
                    <input
                      type="search"
                      placeholder="Search chat"
                      className="bg-transparent outline-none w-full rounded p-2"
                    />
                  </div>
                </div>

                {/* Chat List */}
                <div className="overflow-y-auto w-full h-full flex-grow">
                  {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <ButtonLoader2 />
                    </div>
                  ) : (
                    <>
                      {users?.length > 0 ? (
                        users?.map((user, index) => (
                          <UserListItem
                            key={index}
                            user={user}
                            selectedUserId={selectedUser?.chat_with}
                            userInfo={userInfo}
                            onSelect={handleUserSelect}
                          />
                        ))
                      ) : (
                        <div className="text-center text-gray-500 mt-4">
                          No users found
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Chat Window - Conditionally shown on mobile */}
            {(!isMobile || !showSidebar) &&
            selectedUser?.username &&
            selectedUser?.chat_with ? (
              <div className="flex-1 flex flex-col w-full">
                {/* Chat Header */}
                <div className="px-3 w-full h-[60px] md:h-[80px] bg-white border-b-[0.5px] border-b-[#02174C33] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isMobile && (
                      <button
                        onClick={handleBackToList}
                        className="mr-2 text-gray-600 hover:text-primary"
                      >
                        <FaChevronLeft size={20} />
                      </button>
                    )}
                    <div className="h-[40px] w-[40px] rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-white">
                      {selectedUser?.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-[600] text-[16px] text-[#003F63]">
                        {selectedUser?.username}
                      </h3>
                      <p className="text-sm text-gray-600">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CiVideoOn className="text-[25px] text-gray-600 cursor-pointer hover:text-primary" />
                    <HiDotsVertical className="text-[25px] text-gray-600 cursor-pointer hover:text-primary" />
                  </div>
                </div>

                {/* Chat Messages */}
                <div
                  id="chat-container"
                  className="bg-[#D9D9D945] flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3 w-full"
                >
                  {Object.entries(groupedMessages).map(
                    ([date, dateMessages], index) => (
                      <div key={index}>
                        {/* Date Separator */}
                        <div className="text-center text-gray-500 text-xs md:text-sm my-2">
                          {date}
                        </div>

                        {/* Messages */}
                        {dateMessages.map((message, msgIndex) => (
                          <ChatMessage
                            key={msgIndex}
                            message={message}
                            isCurrentUser={
                              message.sender_id === userInfo?.user?.id
                            }
                            userId={userInfo?.user?.id}
                          />
                        ))}
                      </div>
                    )
                  )}
                </div>

                {/* Message Input */}
                <div className="w-full p-2 md:p-4 bg-white border-t-[0.5px] border-t-[#02174C33] flex items-center">
                  <form onSubmit={sendMessage} className="w-full relative">
                    <button
                      type="button"
                      className="absolute top-0 left-0 h-full px-2 md:px-4 text-[20px] text-gray-600 hover:text-primary cursor-pointer"
                      onClick={handleFileClick}
                    >
                      <MdOutlineAttachment />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <input
                      type="text"
                      placeholder="Write message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full py-2 px-10 md:px-12 rounded outline-none bg-[#F7F9FA] border border-[#F7F9FA] hover:border-secondary focus:border-secondary"
                    />
                    <button
                      type="submit"
                      className={`absolute top-0 right-0 h-full px-2 md:px-4 text-[20px]  ${
                        newMessage
                          ? "cursor-pointer text-gray-600 hover:text-primary"
                          : "text-gray-400"
                      }`}
                    >
                      <TbSend />
                    </button>
                  </form>
                </div>
              </div>
            ) : !isMobile ? (
              <div className="flex-1 flex flex-col justify-center items-center">
                <img
                  src="/assets/images/no-selection-inbox.svg"
                  className="w-full h-[200px] mb-2"
                />
                <h3 className="text-[20px] md:text-[22px] font-bold">
                  Pick up where you left off
                </h3>
                <p className="text-[18px] md:text-[20px] text-gray-500">
                  Select a conversation and chat away.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Inbox;
