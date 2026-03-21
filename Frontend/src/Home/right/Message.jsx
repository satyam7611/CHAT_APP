const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("messenger"));

  const itsMe =
    message.senderId?.toString() === authUser?.user?.id?.toString();

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-400" : "bg-gray-700";

  return (
    <div className="px-2 py-1">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor} max-w-[70%]`}>
          {message.message}
        </div>
      </div>
    </div>
  );
};

export default Message;