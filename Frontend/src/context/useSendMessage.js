import { useState } from "react";
import useConversation from "../stateManageMent/useConversation";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation?._id) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/message/send/${selectedConversation._id}`,
        { message }, // ✅ send message in body
        { withCredentials: true }
      );

      setMessages([...messages, response.data.newMessage]); // ✅ correct data
    } catch (error) {
      console.log("error in useSendMessage", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendMessages,
  };
};

export default useSendMessage;