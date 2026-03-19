import React from "react";
import useConversation from "../stateManageMent/useConversation.js";
import { useEffect, useState } from "react";
import axios from "axios";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
//   console.log("Selected Conversation:", selectedConversation);
console.log("message is:",messages)
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/message/get/${selectedConversation._id}`,
            {
              withCredentials: true,
            },
          );
          
          setMessages(response.data);
//           console.log("API RESPONSE:", response.data);
// console.log("IS ARRAY:", Array.isArray(response.data));
        //   console.log(response.data)
          setLoading(false);
        } catch (error) {
          console.log("error in useGetMessage", error);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);
  return {
    messages,
    loading,
  };
};

export default useGetMessage;
