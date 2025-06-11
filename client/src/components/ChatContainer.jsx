import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return selectedUser ? (
    <div className="overflow-scroll backdrop-blur-lg h-full relative">
      {/* ------------------header------------------ */}

      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={assets.profile_alison} alt="" className="rounded-full w-8" />
        <p className="text-white flex-1 text-lg flex items-center gap-2">
          Alison Martin
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
        </p>
        <img className="md:hidden max-w-7" src={assets.arrow_icon} alt="" />
        <img className="max-w-5 max-md:hidden" src={assets.help_icon} alt="" />
      </div>
      {/*------------- chatarea----- */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"
            }`}
          >
            {msg.image ? (
              <img src={msg.image} alt="" className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8" />
            ) : (
              <p
                className={`p-2 max-w-[200px] text-white border border-gray-700 bg-violet-500/30 font-light md:text-sm rounded-lg mb-8 break-all ${
                  msg.senderId === "680f50e4f10f3cd28382ecf9"? 'rounded-br-none':
                  'rounded-bl-none'
                }`}
              > 
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_alison
                }
                className="rounded-full w-8"
                alt=""
              />
              <p className="text-gray-500 ">{formatMessageTime(msg.createdAt)}</p>
            </div>
            <div ref={scrollEnd}></div>
          </div>
        ))}
        {/* -----------bottom area ----------- */}
          <div className="flex items-center gap-3 p-3 absolute bottom-0 left-0 right-0">
                <div className="flex flex-1 items-center px-3 rounded-full bg-gray-100/10">
                    <input type="text" placeholder="Send a message" className="flex-1 p-3 text-sm border-none rounded-lg outline-none placeholder:text-gray-400 text-white bg-transparent" />
                    <input type="file" id="image" accept="image/png,image/jpeg" hidden/>
                    <label htmlFor="image">
                        <img src={assets.gallery_icon} alt="" className="mr-2 w-5 cursor-pointer" />
                    </label>
                </div>
                <img src={assets.send_button} className="w-7 mr-2 cursor-pointer" alt="" />
          </div>
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col items-center justify-center gap-2 text-gray-500
         bg-white/10 max-md:hidden"
    >
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-white text-lg font-medium">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
