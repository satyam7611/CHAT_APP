import Search from "./Search.jsx";
import User from "./User.jsx";
import useConversation from "../../stateManageMent/useConversation.js";

const Left = () => {
  const { selectedConversation } = useConversation();
  
  return (
    <div className={`flex-1 md:flex-none md:w-[30%] text-white bg-black flex-col ${selectedConversation ? "hidden md:flex" : "flex"}`}>

      <div>
        <h1 className="font-bold text-3xl p-2 mb-3 mx-1.5">Chats</h1>
      </div>
      <div>
        <Search />
      </div>

      <hr />
      <User />
    </div>

  );
};

export default Left;
