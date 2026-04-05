import useConversation from "../../stateManageMent/useConversation";
import Loading from "../../components/Loading";
import { ArrowLeft } from "lucide-react";
import { useSocketContext } from "../../context/SocketContext.jsx";

const Chatuser = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  console.log("chatuser is ", selectedConversation ? selectedConversation.name : '');
  
  return (
    <div className="flex items-center space-x-3 sm:space-x-4 pt-3 pb-3 pl-2 sm:pl-3 sticky top-0 z-10 bg-gray-900 border-b border-gray-700">
      <button 
        onClick={() => setSelectedConversation(null)} 
        className="md:hidden p-1 bg-gray-800 rounded-full hover:bg-gray-700 text-white transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      
      <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
        <div className="w-10 sm:w-14 rounded-full">
          <img src="/IMG_20251209_211011.jpg" alt="" />
        </div>
      </div>
      <div>
        <h1 className="font-bold sm:text-lg">{selectedConversation ? selectedConversation.name : "Loading.."}</h1>
        <span className="text-sm text-gray-300">{isOnline ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
};


export default Chatuser;
