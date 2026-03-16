import { LuLogOut } from "react-icons/lu";
import axios from 'axios';
import Cookies from 'js-cookie'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Logout =({ setAuthUser }) => {
  const [loading ,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleLogout=async()=>{
    setLoading(true);
    try {
     await axios.post("http://localhost:3000/api/v1/users/logout",
      {},
     { withCredentials: true }
     )

      localStorage.removeItem("messenger");
       setAuthUser(null);
      Cookies.remove("jwt");
      setLoading(false);
      alert("Logout successfully");
      navigate('/login');
    } catch (error) {
      console.log("error while logout",error.message)
    }
  }

  return (
    <div className="bg-slate-950   ">
                 <div className="flex flex-col  justify-end h-180 ">
               <LuLogOut onClick={handleLogout} className="text-2xl  text-white hover:rounded-lg hover:bg-gray-500 cursor-pointer  duration-200 " />
      </div>
 
    </div>



  );
};

export default Logout;
