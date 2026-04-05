import { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../stateManageMent/useConversation.js";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation, incrementUnreadCount, deleteMessageFromStore } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // Play notification sound
      const sound = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQ7mBcf8f8R8H9T9/1z/s8f/s8f/s8f/s8f/s8f/s8f/s8f/s8f/s8fn//uQZBAAACwSJUqAAY8FgkSpUAAx4MAAAYEAqAQAIA4BwAAAEQAIBQAQEAIAACoBAAgEAABgICAAAQCAAAAQAABgAAgAQAIAAAQEQAAMACAABAAgAAQAIAAEACAABP//3yA0QGAj/3+zAAAIAAAWCEoAAIQBwAAEIgAAAIAAAQAIAAEA==");
      sound.play().catch(e => console.log("Sound play error:", e));

      if (String(selectedConversation?._id) === String(newMessage.senderId)) {
        // We are currently chatting with the sender, just add the message
        setMessages([...messages, newMessage]);
      } else {
        // We are not chatting with the sender, increment their unread badge
        incrementUnreadCount(newMessage.senderId);
      }
    });

    socket?.on("messageDeleted", ({ messageId }) => {
      deleteMessageFromStore(messageId);
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("messageDeleted");
    };
  }, [socket, messages, setMessages, selectedConversation, incrementUnreadCount, deleteMessageFromStore]);
};

export default useListenMessages;
