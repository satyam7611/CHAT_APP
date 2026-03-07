
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
              <Users key={index} name={e.name} id={index}  email={e.email} />
          ))
         }
           {/* <Users name="Satyam" email="satyam@gmail.com" />
           <Users name="Anshu" email="anshu@gmail.com" />
           <Users name="Aniket" email="aniket@gmail.com"/>
           <Users name="Sourya" email="sourya@gmail.com"/>
           <Users name="Vikas" email="vikas@gmail.com" />
           <Users name="Shivam" email="shivam@gmail.com"/>
           <Users name="Shreyanshu" email="shreyanshu@gmail.com"/>
           <Users name="Himanshu" email="himanshu@gmail.com"/>
           <Users name="Gaurav" email='gaurav@gmail.com'/> */}
    
    </div>
  
  );
};

export default User;
