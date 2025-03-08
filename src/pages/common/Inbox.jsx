import { useState } from "react";
import Layout from "../../components/shared/Layout";
import { FaUserCircle } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { CiSearch, CiVideoOn } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineAttachment } from "react-icons/md";

function Inbox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "The price of a commodity will never go to zero. When you invest in commodities futures, you are not buying a piece of paper that says you own an intangible of the company that can go bankrupt 😌. ",
      sender: "user",
    },
    {
      id: 2,
      text: "It's not always easy to do what's not popular, but that's where you make your money.Buy stocks that look bad to less careful investors and hang on until their real value is recognized.",
      sender: "ai",
    },
    {
      id: 3,
      text: "99%+ of traders don't care about Ferraris and yachts. They just want to pay their bills, save alittle extra money, and sleep well at night. The only way to do that is to bat 70% or more.Anything less, and these goals are nothing more than fantasy.",
      sender: "user",
    },
    {
      id: 2,
      text: "It's not always easy to do what's not popular, but that's where you make your money.Buy stocks that look bad to less careful investors and hang on until their real value is recognized.",
      sender: "ai",
    },
    {
      id: 3,
      text: "99%+ of traders don't care about Ferraris and yachts. They just want to pay their bills, save alittle extra money, and sleep well at night. The only way to do that is to bat 70% or more.Anything less, and these goals are nothing more than fantasy.",
      sender: "user",
    },
    {
      id: 2,
      text: "It's not always easy to do what's not popular, but that's where you make your money.Buy stocks that look bad to less careful investors and hang on until their real value is recognized.",
      sender: "ai",
    },
    {
      id: 3,
      text: "99%+ of traders don't care about Ferraris and yachts. They just want to pay their bills, save alittle extra money, and sleep well at night. The only way to do that is to bat 70% or more.Anything less, and these goals are nothing more than fantasy.",
      sender: "user",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, text: newMessage, sender: "user" },
    ]);
    setNewMessage("");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full h-auto bg-white pt-[60px] pb-30">
        <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
        <h1 className="font-[700] text-[48px] text-center text-secondary mt-10">
          Inbox
        </h1>
      </div>

      <div className="w-full h-[90vh] mb-40 px-30">
        <div className="w-full h-full bg-white border-[0.5px] border-[#02174C33] shadow-2xl flex">
          {/* Chat Sidebar */}
          <div className="w-1/4 flex flex-col border-r-[0.5px] border-r-[#02174C33]">
            <div className="w-full h-[80px] px-3 flex items-center ">
              <div className="w-full border border-[#02174C33] flex items-center px-2 rounded-sm">
                <CiSearch className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search chat"
                  className="bg-transparent outline-none w-full rounded p-2"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="overflow-y-auto w-full h-full flex-grow">
              {[...Array(15)].map((_, index) => (
                <div
                  key={index}
                  className="flex relative items-center py-3 px-3 border-t-[0.5px] border-t-[#02174C33] hover:bg-[#0AF8860F] cursor-pointer"
                >
                  <div className="w-8 h-8 text-gray-300 rounded-full flex justify-center items-center">
                    <FaUserCircle className="w-8 h-8" />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center gap-2 ">
                      <h3 className="font-[600] text-[16px] text-[#003F63]">
                        Jenny Wilson
                      </h3>
                      <div className="bg-primary p-1 rounded-[30px] w-[18px] h-[18px] text-[10px] flex justify-center items-center font-[600]">
                        40
                      </div>
                    </div>
                    <p className="font-[500] text-[14px] text-[#6F7487]">
                      How are you?
                    </p>
                    <p className="font-[500] text-[12px] text-[#6F7487] absolute right-3 top-8">
                      10:27 AM
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            <div className="px-4 w-full h-[80px] bg-white border-b-[0.5px] border-b-[#02174C33] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 text-gray-300 rounded-full flex justify-center items-center">
                  <FaUserCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-[600] text-[16px] text-[#003F63]">
                    Jenny Wilson
                  </h3>
                  <p className="text-sm text-gray-600">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-primary text-secondary px-3 py-1 rounded">
                  Next Milestone: March 2
                </button>
                <CiVideoOn className="text-[25px] text-gray-400" />
                <HiDotsVertical className="text-[25px] text-gray-400" />
              </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-[#D9D9D945] flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 my-3 rounded-lg w-3/4 ${
                      msg.sender === "user"
                        ? "bg-[#003F63] shadow-xs text-white text-[14px] font-[400] rounded-xl rounded-br-none"
                        : "bg-[#FAFAFA] shadow-xs text-black text-[14px] font-[400] rounded-xl rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="w-full p-4 bg-white border-t-[0.5px] border-t-[#02174C33] flex items-center">
              <form onSubmit={sendMessage} className="w-full relative">
                <button
                  type="button"
                  className="cursor-pointer absolute top-0 left-0 h-full px-4 text-[20px] hover:text-primary"
                >
                  <MdOutlineAttachment />
                </button>
                <input
                  type="text"
                  placeholder="Write message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full py-2 px-12  rounded outline-none bg-[#F7F9FA] border border-[#F7F9FA] hover:border-secondary focus:border-secondary"
                />
                <button
                  type="submit"
                  className="cursor-pointer absolute top-0 right-0 h-full px-4 text-[20px] hover:text-primary"
                >
                  <TbSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Inbox;
