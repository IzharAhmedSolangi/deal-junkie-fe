import AppHead from "../../seo/AppHead";
import { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import useGetllAllChats from "../../services/admin/useGetllAllChats";
import { CiSearch } from "react-icons/ci";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";

function Chats() {
  return (
    <>
      <AppHead title="Chats - Deal Junkie" />
      <div className="w-full h-auto p-5">
        <AdminChatInterface />
      </div>
    </>
  );
}

export default Chats;

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

function AdminChatInterface() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(true);
  const { data, isLoading } = useGetllAllChats();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowSidebar(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChatSelect = (chatIndex) => {
    const selectedData = data[chatIndex];
    setSelectedChat(selectedData);

    // Combine messages from both sides of the conversation and sort by timestamp
    const senderMessages = selectedData.chat || [];
    const receiverMessages =
      data?.find(
        (item) =>
          item.sender === selectedData.receiver &&
          item.receiver === selectedData.sender
      )?.chat || [];

    const allMessages = [...senderMessages, ...receiverMessages].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    setCurrentMessages(allMessages);

    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="w-full h-[calc(100vh-110px)]">
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <ButtonLoader3 />
        </div>
      )}
      {data && (
        <div className="w-full h-full bg-white border-[0.5px] border-[#02174C33] flex">
          {/* Chat List Sidebar */}
          {showSidebar && (
            <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col border-r-[0.5px] border-r-[#02174C33]">
              <div className="w-full h-auto py-3 px-3">
                <h1 className="text-xl font-semibold text-gray-800">
                  Chats ({data?.length})
                </h1>
                <div className="w-full border border-[#02174C33] flex items-center px-2 rounded-sm">
                  <CiSearch className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <input
                    type="search"
                    placeholder="Search chat"
                    className="bg-transparent outline-none w-full rounded p-2"
                  />
                </div>
              </div>

              <div className="overflow-y-auto w-full h-full flex-grow">
                {data?.map((item, index) => {
                  const isFile =
                    item.chat[item.chat.length - 1].message.includes(BASE_URL);
                  const lastMessage =
                    item.chat && item.chat.length > 0
                      ? item.chat[item.chat.length - 1].message
                      : "No messages";
                  const lastTimestamp =
                    item.chat && item.chat.length > 0
                      ? item.chat[item.chat.length - 1].timestamp
                      : null;

                  return (
                    <div
                      key={index}
                      className={`flex relative items-center py-3 px-3 border-t-[0.5px] border-t-[#02174C33] cursor-pointer ${
                        selectedChat === item
                          ? "bg-blue-50"
                          : "hover:bg-[#0AF8860F]"
                      }`}
                      onClick={() => handleChatSelect(index)}
                    >
                      <div className="h-[40px] w-[65px] relative flex">
                        <div className="absolute left-0 h-[40px] w-[40px] rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-white">
                          {item.sender.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute left-7 h-[40px] w-[40px] rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-white">
                          {item.receiver.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-2 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-gray-900">
                            {item.sender} & {item.receiver}
                          </p>
                          {lastTimestamp && (
                            <span className="text-xs text-gray-500">
                              {formatTime(lastTimestamp)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {isFile ? "Attachment" : lastMessage}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chat Window */}
          <div
            className={`${
              !showSidebar ? "block" : "hidden"
            } md:block w-full h-full flex-1 flex flex-col bg-white`}
          >
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="w-full h-[60px] px-3 border-b border-gray-200 flex items-center">
                  {isMobile && (
                    <button
                      onClick={toggleSidebar}
                      className="mr-2 text-gray-600 hover:text-gray-900"
                    >
                      <FaChevronLeft size={20} className="flex-shrink-0" />
                    </button>
                  )}
                  <div className="w-full flex items-center justify-center gap-3">
                    <div className="flex items-center gap-1">
                      <h1 className="font-bold text-gray-900">
                        {selectedChat.sender}
                      </h1>
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-white">
                        {selectedChat.sender.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="mx-5 bg-[#E7E6E6] px-3 py-1 text-[#5F5B5B] rounded-md">
                      Chat Inactive
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-white">
                        {selectedChat.receiver.charAt(0).toUpperCase()}
                      </div>
                      <h1 className="font-bold text-gray-900">
                        {selectedChat.receiver}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="bg-[#D9D9D945] flex-1 overflow-y-auto w-full h-[calc(100%-60px)] flex-grow p-3 md:p-4 space-y-2 md:space-y-3">
                  {currentMessages.map((msg, index) => {
                    const isSender = msg.sender_name === selectedChat.sender;
                    const isReceiver = !isSender;

                    const showDateSeparator =
                      index === 0 ||
                      formatDate(currentMessages[index - 1].timestamp) !==
                        formatDate(msg.timestamp);

                    return (
                      <div key={index}>
                        {showDateSeparator && (
                          <div className="flex justify-center my-2">
                            <div className="text-center text-gray-500 text-xs md:text-sm my-2">
                              {formatDate(msg.timestamp)}
                            </div>
                          </div>
                        )}

                        <div
                          className={`flex relative ${
                            isReceiver && "justify-end"
                          } ${isSender && "justify-start"}`}
                        >
                          <div
                            className={`p-3 my-3 rounded-lg max-w-[75%] break-words mb-5 ${
                              isReceiver &&
                              "bg-[#003F63] text-white rounded-xl rounded-br-none"
                            } ${
                              isSender &&
                              "bg-[#FAFAFA] text-black rounded-xl rounded-bl-none"
                            }`}
                          >
                            {msg.message}
                          </div>
                          <span className="text-[10px] text-gray-500 absolute bottom-0">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex-1 flex items-center justify-center">
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
