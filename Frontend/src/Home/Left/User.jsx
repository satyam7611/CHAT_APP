
import { useEffect } from "react";
import Users from "./Users";
import axios from 'axios';
import GetAllUser from "../../context/GetAllUser";
const User = () => {
const [allUsers,loading]=GetAllUser();
if(loading){
  return <p className="text-center">Loading....</p>
}
  return (
  <div className="overflow-y-auto h-[calc(100vh-120px)]">
         {
          allUsers.map((e,index)=>(
              <Users key={index} name={e.name} id={e._id}  email={e.email} />
          ))
         }
     
    
    </div>
  
  );
};

export default User;
