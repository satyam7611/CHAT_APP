const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("messenger"));

  const itsMe =
    message.senderId?.toString() === authUser.user.id;

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-400" : "";
  console.log(message.senderId=== authUser.user.id)

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message}
        </div>
      </div>
    </div>
  );
};

export default Message;