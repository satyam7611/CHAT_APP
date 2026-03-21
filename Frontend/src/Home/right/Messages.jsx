import { useEffect, useRef } from "react";
import useGetMessage from "../../context/useGetMessage.jsx";
import Loading from "../../components/Loading.jsx";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  const bottomRef = useRef();

  // 🔥 auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-2">
      
      {loading && <Loading />}

      {!loading && messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      }

      {!loading && messages.length === 0 && (
        <p className="text-center mt-[20%] text-2xl">say hi</p>
      )}

      {/* 👇 auto scroll anchor */}
      <div ref={bottomRef}></div>

    </div>
  );
};

export default Messages;