import User from "./User";
import useConversation from "../../stateManageMent/useConversation.js"
import { useSocketContext } from "../../context/SocketContext.jsx";

const Users = ({ id, name, email }) => {
  const { selectedConversation, setSelectedConversation, unreadCounts, clearUnreadCount } = useConversation();
  const { onlineUsers } = useSocketContext();
  
  const isSelected = selectedConversation?._id === id;
  const unreadCount = unreadCounts[id] || 0;
  const isOnline = onlineUsers.includes(id);

  const handleSelectConversation = () => {
    setSelectedConversation({ _id: id, name, email });
    if (unreadCount > 0) {
      clearUnreadCount(id);
    }
  };

  return (
    <div className={`hover:bg-slate-600 duration-300 ${
      isSelected ?"bg-slate-700" : ""
    }`} onClick={handleSelectConversation}>
      <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-3.5 hover:bg-slate-600 duration-300 cursor-pointer">
        <div className="flex space-x-3 sm:space-x-4 items-center min-w-0">
          <div className={`avatar shrink-0 ${isOnline ? "avatar-online" : ""}`}>
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full">
              <img src="/IMG_20251209_211011.jpg" alt="" />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="font-bold truncate text-sm sm:text-base">{name}</h1>
            <span className="text-xs sm:text-sm text-gray-400 truncate block">{email}</span>
          </div>
        </div>
        {unreadCount > 0 && (
          <div className="bg-green-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shrink-0 ml-2">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
};


export default  Users;