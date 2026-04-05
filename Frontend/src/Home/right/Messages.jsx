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

  const formatMessageDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-2">
      
      {loading && <Loading />}

      {!loading && messages.length > 0 &&
        messages.map((message, index) => {
          const currentDateStr = formatMessageDate(message.createdAt);
          const prevDateStr = index > 0 ? formatMessageDate(messages[index - 1].createdAt) : null;
          const showDateBadge = currentDateStr !== prevDateStr;

          return (
            <div key={message._id}>
              {showDateBadge && currentDateStr && (
                <div className="flex justify-center my-3 relative z-0">
                  <span className="bg-gray-800 text-gray-300 text-[11px] font-medium px-4 py-1.5 rounded-full shadow-sm border border-gray-700/60 uppercase tracking-wide">
                    {currentDateStr}
                  </span>
                </div>
              )}
              <Message message={message} />
            </div>
          );
        })
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