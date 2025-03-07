import { useState } from "react";
import Layout from "../../components/shared/Layout";
import { FaUserCircle } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { CiSearch, CiVideoOn } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";

function Inbox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "The price of a commodity will never go to zero. When you invest in commodities futures, you are not buying a piece of paper that says you own an intangible of the company that can go bankrupt 😌. ",
      sender: "user"
    },
    {
      id: 2,
      text: "It's not always easy to do what's not popular, but that's where you make your money.Buy stocks that look bad to less careful investors and hang on until their real value is recognized.",
      sender: "ai"
    },
    {
      id: 3,
      text: "99%+ of traders don't care about Ferraris and yachts. They just want to pay their bills, save alittle extra money, and sleep well at night. The only way to do that is to bat 70% or more.Anything less, and these goals are nothing more than fantasy.",
      sender: "user"
    },
    {
      id: 2,
      text: "It's not always easy to do what's not popular, but that's where you make your money.Buy stocks that look bad to less careful investors and hang on until their real value is recognized.",
      sender: "ai"
    },
    {
      id: 3,
      text: "99%+ of traders don't care about Ferraris and yachts. They just want to pay their bills, save alittle extra money, and sleep well at night. The only way to do that is to bat 70% or more.Anything less, and these goals are nothing more than fantasy.",
      sender: "user"
    },
    {
      id: 2,
      text: "It's not always easy to do what's not popular, but that's where you make your money.Buy stocks that look bad to less careful investors and hang on until their real value is recognized.",
      sender: "ai"
    },
    {
      id: 3,
      text: "99%+ of traders don't care about Ferraris and yachts. They just want to pay their bills, save alittle extra money, and sleep well at night. The only way to do that is to bat 70% or more.Anything less, and these goals are nothing more than fantasy.",
      sender: "user"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, text: newMessage, sender: "user" }
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

      <div className="flex h-screen  mb-40 px-30 ">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-lg flex flex-col">
          <div className="p-4 border-b border-gray-300 flex items-center ">
            <div className="border border-gray-300 flex items-center  px-2 rounded">
              <CiSearch className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search chat"
                className="bg-transparent outline-none w-full  rounded p-2"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="overflow-y-auto flex-grow px-3">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="flex relative items-center p-3 border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex justify-center items-center">
                  <FaUserCircle className="w-8 h-8" />
                </div>
                <div className="ml-3 ">
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
                  <p className="font-[500] text-[12px] text-[#6F7487] absolute right-0 top-8">
                    10:27 AM
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col shadow-lg">
          <div className="p-4 bg-white border-b border-gray-300 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex justify-center items-center">
                <FaUserCircle className="w-8 h-8" />
              </div>
              <div className="ml-3">
                <h3 className="font-[600] text-[16px] text-[#003F63]">
                  Jenny Wilson
                </h3>
                <p className="text-sm text-gray-600">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded">
                Next Milestone: March 2
              </button>
              <CiVideoOn className="text-[25px] text-gray-400" />
              <HiDotsVertical className="text-[25px] text-gray-400" />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                      ? "bg-secondary text-white text-[14px] font-[400]"
                      : "bg-gray-200 text-black text-[14px] font-[400]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-300 flex items-center">
            <input
              type="text"
              placeholder="Write message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded outline-none"
            />
            <button
              onClick={sendMessage}
              className="ml-3 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              <IoSendSharp className="w-4 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Inbox;
