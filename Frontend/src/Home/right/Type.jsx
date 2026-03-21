import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import useSendMessage from "../../context/useSendMessage.js";

const Type = () => {
  const [message, setMessage] = useState(""); 
  const { loading, sendMessages } = useSendMessage();

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessages(message); 
    setMessage(""); // 
  };
  const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      sendMessages(message);
      setMessage("");
    }
  }

  return (
    <div className="bg-gray-900 p-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type here"
          className="flex-1 bg-gray-800 text-white p-3 rounded-lg outline-none"
        />

        <IoMdSend
          onClick={handleSend} 
          className="text-2xl text-white cursor-pointer hover:text-blue-400 transition"
        />
      </div>
    </div>
  );
};

export default Type;