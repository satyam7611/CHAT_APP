
import { useEffect } from "react";
import Users from "./Users";
import axios from 'axios';
import GetAllUser from "../../context/GetAllUser";
import useConversation from "../../stateManageMent/useConversation.js";

const User = () => {
const [allUsers,loading]=GetAllUser();
const { searchQuery } = useConversation();

if(loading){
  return <p className="text-center">Loading....</p>
}

// Filter users based on searchQuery
const filteredUsers = allUsers.filter(user => 
  (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) || 
  (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
);

  return (
  <div className="overflow-y-auto h-[calc(100vh-120px)]">
         {filteredUsers.length > 0 ? (
          filteredUsers.map((e,index)=>(
              <Users key={index} name={e.name} id={e._id}  email={e.email} />
          ))
         ) : (
           <p className="text-center text-gray-400 mt-4">No contacts found</p>
         )}
    </div>
  );
};

export default User;
