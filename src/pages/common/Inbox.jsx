/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useContext } from "react";
import { FaFile, FaUserCircle } from "react-icons/fa";
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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown Date"; // Handle missing timestamps

  // Ensure proper ISO format: "YYYY-MM-DDTHH:mm:ss"
  const formattedTimestamp = timestamp.replace(" ", "T");
  const date = new Date(formattedTimestamp);

  if (isNaN(date.getTime())) return "Unknown Date"; // Handle invalid dates

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
};

function Inbox() {
  const query = useQuery();
  const token = getAccessToken();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const SOCKETS_URL = import.meta.env.VITE_SOCKETS_URL;
  var userId = query.get("userId");
  const params_user = {
    chat_with: userId ? parseInt(userId) : null,
    username: null,
  };
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(params_user);
  const { userInfo } = useContext(GlobalContext);
  const socketUrl = `${SOCKETS_URL}/ws/chat/?partner_id=${selectedUser?.chat_with}&token=${token}`;

  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);
  const disconnectTimeoutRef = useRef(null);

  const connectSocket = () => {
    socketRef.current = new ReconnectingWebSocket(socketUrl);
    socketRef.current.onopen = () => {
      console.log("WebSocket Connected");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        if (response.message) {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              message: response.message,
              sender_id: response.sender_id,
              receiver_id: response.receiver_id,
              timestamp: new Date()
                .toISOString()
                .replace("T", " ")
                .slice(0, 19),
            },
          ]);
          setTimeout(scrollToBottom, 0);
        }
        if (response.users_chat_list) {
          setUsers(response.users_chat_list);
          if (userId) {
            const user = response.users_chat_list.find(
              (item) => item.chat_with === selectedUser.chat_with
            );
            setMessages(user.messages);
            setTimeout(scrollToBottom, 0);
          }
        }
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
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // Ensure the WebSocket is connected
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      await new Promise((resolve) => {
        connectSocket();
        setTimeout(resolve, 500);
      });
    }

    sendToSocket(newMessage);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        message: newMessage,
        receiver_id: selectedUser?.chat_with,
        sender_id: userInfo?.user?.id,
        timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      },
    ]);
    setNewMessage("");
  };

  const sendToSocket = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const payload = JSON.stringify({
        message: message,
        receiver_id: selectedUser?.chat_with,
      });
      socketRef.current.send(payload);
      setTimeout(scrollToBottom, 0);
    } else {
      console.error("WebSocket not open");
    }
  };

  useEffect(() => {
    connectSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (disconnectTimeoutRef.current) {
        clearTimeout(disconnectTimeoutRef.current);
      }
    };
  }, [selectedUser]);

  const groupedMessages = messages
    .slice() // Create a copy to avoid mutating state
    .sort(
      (a, b) =>
        new Date(a.timestamp.replace(" ", "T")) -
        new Date(b.timestamp.replace(" ", "T"))
    ) // Sort by time
    .reduce((acc, message) => {
      const dateKey = formatDate(message.timestamp);
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(message);
      return acc;
    }, {});

  // upload files
  const fileInputRef = useRef(null);
  const { Upload, upload } = useUpload();
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Upload({ image: file });
    }
  };

  useEffect(() => {
    if (upload.url) {
      sendToSocket(upload.url);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          message: upload.url,
          receiver_id: selectedUser?.chat_with,
          sender_id: userInfo?.user?.id,
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
        },
      ]);
    }
  }, [upload]);

  const scrollToBottom = () => {
    let chatContainer = document.getElementById("chat-container");
    chatContainer && chatContainer.scrollTo(0, chatContainer.scrollHeight);
  };
  return (
    <>
      <AppHead title="Inbox - Deal Junkie" />
      <div className="relative w-full h-auto bg-white pb-30">
        <div className="w-full md:h-[320px] h-[260px] flex justify-center items-center">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Inbox
          </h1>
        </div>

        <div className="w-full h-[90vh] px-30">
          <div className="w-full h-full bg-white border-[0.5px] border-[#02174C33] shadow-2xl flex">
            {/* Chat Sidebar */}
            <div className="w-[300px] flex-shrink-0 flex flex-col border-r-[0.5px] border-r-[#02174C33]">
              <div className="w-full h-[80px] px-3 flex items-center">
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
                {users?.map((item, index) => (
                  <div
                    key={index}
                    className={`flex relative items-center py-3 px-3 border-t-[0.5px] border-t-[#02174C33] 
                    cursor-pointer ${
                      selectedUser?.chat_with === item.chat_with
                        ? "bg-blue-50"
                        : "hover:bg-[#0AF8860F]"
                    }`}
                    onClick={() => {
                      setSelectedUser(item);
                      setMessages(item.messages);
                    }}
                  >
                    <div className="w-8 h-8 text-gray-300 rounded-full flex justify-center items-center">
                      <FaUserCircle className="w-8 h-8" />
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-[600] text-[16px] text-[#003F63]">
                          {item.username}
                        </h3>
                        {/* <div className="bg-primary p-1 rounded-[30px] w-[18px] h-[18px] text-[10px] flex justify-center items-center font-[600]">
                        40
                      </div> */}
                      </div>
                      {!item.messages[
                        item.messages.length - 1
                      ]?.message?.includes(`${BASE_URL}`) && (
                        <p className="font-[400] text-[10px] text-[#6F7487]">
                          {item.messages[
                            item.messages.length - 1
                          ]?.message.slice(0, 30)}
                        </p>
                      )}
                      <p className="font-[500] text-[12px] text-[#6F7487] absolute right-3 top-8">
                        <p>
                          {new Date(
                            item.messages[
                              item.messages.length - 1
                            ]?.timestamp.replace(" ", "T")
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                            timeZone:
                              Intl.DateTimeFormat().resolvedOptions().timeZone,
                          })}
                        </p>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            {selectedUser?.username && selectedUser?.chat_with ? (
              <div className="flex-1 flex flex-col w-[810px]">
                <div className="px-4 w-full h-[80px] bg-white border-b-[0.5px] border-b-[#02174C33] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="w-8 h-8 text-gray-300" />
                    <div>
                      <h3 className="font-[600] text-[16px] text-[#003F63]">
                        {selectedUser?.username}
                      </h3>
                      <p className="text-sm text-gray-600">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <button className="bg-primary text-secondary px-3 py-1 rounded">
                  Next Milestone: March 2
                </button> */}
                    <CiVideoOn className="text-[25px] text-gray-600 cursor-pointer hover:text-primary" />
                    <HiDotsVertical className="text-[25px] text-gray-600 cursor-pointer hover:text-primary" />
                  </div>
                </div>

                {/* Chat Messages */}
                <div
                  id="chat-container"
                  className="bg-[#D9D9D945] flex-1 overflow-y-auto p-4 space-y-3 w-full"
                >
                  {Object.entries(groupedMessages).map(
                    ([date, msgs], index) => (
                      <div key={index}>
                        {/* Date Separator */}
                        <div className="text-center text-gray-500 text-sm my-2">
                          {date}
                        </div>

                        {/* Messages */}
                        {msgs.map((item, idx) => {
                          const supportedImageTypes = [
                            "jpeg",
                            "png",
                            "jpg",
                            "ico",
                            "jfif",
                          ];
                          const supprtedAudioTypes = ["mp3"];
                          const supprtedVideoTypes = ["mp4"];
                          const supprtedPdfTypes = ["pdf"];
                          const supportedRarTypes = [
                            "rar",
                            "zip",
                            "docx",
                            "doc",
                            "txt",
                          ];
                          let fileName, fileType;

                          if (item.message?.includes(`${BASE_URL}`)) {
                            const urlParts = item.message.split("/");
                            fileName = decodeURIComponent(
                              urlParts[urlParts.length - 1]
                            );
                            fileType = fileName.split(".").pop();
                          }

                          return (
                            <div
                              key={idx}
                              className={`flex relative ${
                                item.sender_id === userInfo?.user?.id
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              {item.message?.includes(`${BASE_URL}`) && (
                                <div className="bg-gray-300 p-1 rounded mb-5 my-3">
                                  {supportedImageTypes.includes(fileType) && (
                                    <img
                                      src={item?.message}
                                      alt=""
                                      className="w-[300px] h-auto object-contain"
                                    />
                                  )}
                                  {supprtedVideoTypes.includes(fileType) && (
                                    <video
                                      controls
                                      className="w-[300px] h-full"
                                    >
                                      <source
                                        src={item?.message}
                                        type="video/webm"
                                      />
                                    </video>
                                  )}
                                  {supprtedAudioTypes.includes(fileType) && (
                                    <audio controls>
                                      <source
                                        src={item?.message}
                                        type="audio/mp3"
                                      />
                                    </audio>
                                  )}
                                  {supprtedPdfTypes.includes(fileType) && (
                                    <iframe
                                      title={"Viewer"}
                                      src={item?.message}
                                      frameBorder={0}
                                      style={{
                                        height: "300px",
                                        width: "300px",
                                      }}
                                    ></iframe>
                                  )}
                                  {supportedRarTypes.includes(fileType) && (
                                    <div className="flex items-center px-3 py-2">
                                      <FaFile />
                                      <span className="ml-2 text-sm text-gray-800">
                                        {fileName}
                                      </span>
                                      <button className="rounded-full w-[22px] h-[22px] flex justify-center items-center border border-gray-500 text-gray-500 cursor-pointer ml-3 hover:border-secondary hover:text-secondary">
                                        <MdFileDownload />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                              {!item.message?.includes(`${BASE_URL}`) && (
                                <div
                                  className={`p-3 my-3 rounded-lg max-w-[75%] break-words mb-5 ${
                                    item.sender_id === userInfo?.user?.id
                                      ? "bg-[#003F63] text-white rounded-xl rounded-br-none"
                                      : "bg-[#FAFAFA] text-black rounded-xl rounded-bl-none"
                                  }`}
                                >
                                  {item.message}
                                </div>
                              )}
                              <span className="text-[10px] text-gray-500 absolute bottom-0">
                                {new Date(
                                  item.timestamp.replace(" ", "T")
                                ).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                  timeZone:
                                    Intl.DateTimeFormat().resolvedOptions()
                                      .timeZone,
                                })}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>

                {/* Message Input */}
                <div className="w-full p-4 bg-white border-t-[0.5px] border-t-[#02174C33] flex items-center">
                  <form onSubmit={sendMessage} className="w-full relative">
                    <button
                      type="button"
                      className="absolute top-0 left-0 h-full px-4 text-[20px] text-gray-600 hover:text-primary cursor-pointer"
                      onClick={handleClick}
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
                      className="w-full py-2 px-12 rounded outline-none bg-[#F7F9FA] border border-[#F7F9FA] hover:border-secondary focus:border-secondary"
                    />
                    <button
                      type="submit"
                      className="absolute top-0 right-0 h-full px-4 text-[20px] cursor-pointer text-gray-600 hover:text-primary"
                    >
                      <TbSend />
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex justify-center items-center w-[810px]">
                <p className="text-[20px] text-gray-500">start conversation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Inbox;
