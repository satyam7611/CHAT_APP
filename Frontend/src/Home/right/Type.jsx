import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import useSendMessage from "../../context/useSendMessage.js";

const Type = () => {
  const [message, setMessage] = useState(""); // ✅ state
  const { loading, sendMessages } = useSendMessage();

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessages(message); // ✅ send
    setMessage(""); // ✅ clear input
  };

  return (
    <div className="bg-gray-900 p-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={message} // ✅ controlled input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type here"
          className="flex-1 bg-gray-800 text-white p-3 rounded-lg outline-none"
        />

        <IoMdSend
          onClick={handleSend} // ✅ click event
          className="text-2xl text-white cursor-pointer hover:text-blue-400 transition"
        />
      </div>
    </div>
  );
};

export default Type;