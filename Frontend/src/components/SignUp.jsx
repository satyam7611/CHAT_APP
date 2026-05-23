import { Mail, User, Lock } from "lucide-react";
import { useForm } from "react-hook-form"
import axiosInstance from "../utils/axiosConfig";
import { useAuth } from "../context/AuthProvider.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {

  const {authUser,setAuthUser}=useAuth();
      const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password=watch("password","");
  const confirmPassword=watch("confirmPassword","");
  const validateConfirmPasswordMatch=(value)=>{
    return value===password || "Password do not match";
  }

  const onSubmit = async (data) => {
    const userInfo={
        name:data.Username,
        email:data.Email,
        password:data.password,
        confirmPassword:data.confirmPassword
    }
 await axiosInstance.post("/api/v1/users/signup",userInfo).then((Response)=>
  {console.log(Response)
    if(Response.data){
      toast.success("Thank you for registering!")
    }
    localStorage.setItem("messenger",JSON.stringify(Response.data))
    setAuthUser(Response.data)
  }
).catch((err)=> {
  console.log(err);
  toast.error(err.response?.data?.message || err.message);
})

  }

  console.log(watch("example")) // watch input value by passing the name of it
  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-gray-100 px-4">
      <form className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent">Messenger</h1>
          <p className="text-sm text-gray-500">Create a  <span className="font-bold text-1xl bg-linear-to-l from-blue-500 to-blue-900 text-transparent bg-clip-text">new</span> account</p>
        </div>

        {/* Email */}
        <div className="relative">
          <Mail 
            className="absolute left-3 top-10/12 -translate-y-10/12 text-gray-400" 
            style={{ top: "21px" }}
            size={18} 
          />
          <input 
         
            type="email"
            placeholder="Email"
            className="w-full border text-black rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("Email",{required:true})}
             onChange={(e)=>console.log(e.target.value)}
          />
             {errors.Email && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
         </div>

        {/* Username */}
        <div className="relative">
          <User 
            className="absolute left-3 top-10/12 -translate-y-10/12 text-gray-400" 
            style={{ top: "21px" }}
            size={18} 
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full text-black border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("Username",{required:true})}
          />
           {errors.Username && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
        </div>

        {/* Password */}
        <div className="relative">
          <Lock 
            className="absolute left-3 top-10/12 -translate-y-10/12 text-gray-400" 
            style={{ top: "21px" }}
            size={18} 
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border text-black rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password",{required:true})}
          />
           {errors.password && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Lock 
            className="absolute left-3 top-10/12 -translate-y-10/12 text-gray-400" 
            style={{ top: "21px" }}
            size={18} 
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border text-black rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("confirmPassword", {
  required: "Confirm password is required",
  validate: validateConfirmPasswordMatch})}
          />
          {errors.confirmPassword && (
  <span className="text-red-500 text-sm mt-1 block">
    {errors.confirmPassword.message}
  </span>
)}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
          Sign Up
        </button>
        <div className="flex justify-between text-sm sm:text-base">
               <p className="text-black">
            Have any Account ?
        </p>
       <Link to="/login" className=" text-blue-700">Login</Link>
        </div>
      
      </form>
    </div>
  );
};

export default SignUp;