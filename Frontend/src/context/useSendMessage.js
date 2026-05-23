import { useState } from "react";
import useConversation from "../stateManageMent/useConversation";
import axiosInstance from "../utils/axiosConfig";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessages = async (message, file, duration) => {
    if (!selectedConversation?._id) return;

    setLoading(true);
    try {
      let data;
      let headers = {};

      if (file) {
        data = new FormData();
        data.append("message", message);
        data.append("file", file);
        if (duration) {
          data.append("duration", duration);
        }
        headers["Content-Type"] = "multipart/form-data";
      } else {
        data = { message };
      }

      const response = await axiosInstance.post(
        `/api/message/send/${selectedConversation._id}`,
        data,
        { headers }
      );

      setMessages([...messages, response.data.newMessage]); 
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