import useConversation from "../../stateManageMent/useConversation";
import Loading from "../../components/Loading";
import { ArrowLeft } from "lucide-react";
import { useSocketContext } from "../../context/SocketContext.jsx";

const Chatuser = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  console.log("chatuser is ", selectedConversation ? selectedConversation.name : '');
  
  const renderAvatar = (url, userName) => {
    if (url) {
      return (
        <img 
          src={url} 
          alt={userName} 
          className="w-full h-full object-cover rounded-full" 
        />
      );
    }
    const initials = userName ? userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";
    return (
      <div className="w-full h-full rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm border border-slate-700">
        {initials}
      </div>
    );
  };

  return (
    <div className="flex items-center space-x-3 sm:space-x-4 pt-3 pb-3 pl-2 sm:pl-3 sticky top-0 z-10 bg-gray-900 border-b border-gray-700 min-w-0">
      <button 
        onClick={() => setSelectedConversation(null)} 
        className="md:hidden p-1 bg-gray-800 rounded-full hover:bg-gray-700 text-white transition-colors shrink-0"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      
      <div className={`avatar shrink-0 ${isOnline ? "avatar-online" : ""}`}>
        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full">
          {renderAvatar(selectedConversation?.profilePhoto, selectedConversation?.name)}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="font-bold text-sm sm:text-lg truncate">{selectedConversation ? selectedConversation.name : "Loading.."}</h1>
        <span className="text-xs sm:text-sm text-gray-300 block">{isOnline ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
};


export default Chatuser;
