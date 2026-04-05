import { LuLogOut } from "react-icons/lu";
import axios from 'axios';
import Cookies from 'js-cookie'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useConversation from "../../stateManageMent/useConversation.js";
import toast from 'react-hot-toast';

const Logout =({ setAuthUser }) => {
  const [loading ,setLoading]=useState(false);
  const navigate=useNavigate();
  const { selectedConversation } = useConversation();

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
      toast.success("Logout successfully");
      navigate('/login');
    } catch (error) {
      toast.error("Error while logging out");
      console.log("error while logout",error.message)
    }
  }

  return (
    <div className={`bg-slate-950 w-12 md:w-[4%] flex flex-col items-center justify-end pb-8 h-screen ${selectedConversation ? "hidden md:flex" : "flex"}`}>
      <LuLogOut onClick={handleLogout} className="text-2xl text-white hover:bg-gray-700 rounded-lg p-1 cursor-pointer duration-200" size={32} />
    </div>
  );
};

export default Logout;
