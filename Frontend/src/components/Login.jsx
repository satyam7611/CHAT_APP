import { Mail, User, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const {authUser,setAuthUser}=useAuth();

  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const userInfo = {
      email: data.Email,
      password: data.password,
    };
    axios
      .post("http://localhost:3000/api/v1/users/signin", userInfo, {
        withCredentials: true,
      })
      .then((Response) => {
        console.log(Response.data) ;
        if(Response.data){
          toast.success("Login successful")
        }
        localStorage.setItem("messenger",JSON.stringify(Response.data))
         setAuthUser(Response.data)
      }
       
    )
      .catch((err) =>{
        console.log(err);
        toast.error(err.response?.data?.message || err.message);
      }

    );
  };
  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-gray-100 px-4">
      <form
        className="w-90 max-w-md bg-white shadow-lg rounded-xl p-8 space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent">
            Messenger
          </h1>
          <p className="text-1xl text-gray-500">
            Login{" "}
            <span className="font-bold text-1xl bg-linear-to-l from-blue-500 to-blue-900 text-transparent bg-clip-text">
              with
            </span>{" "}
            your account
          </p>
        </div>

        {/* Email */}
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border text-black rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("Email", { required: true })}
            onChange={(e) => console.log(e.target.value)}
          />
          {errors.Email && (
            <span className="text-black">This field is required</span>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border text-black rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-black">This field is required</span>
          )}
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
          Login
        </button>
        <div className="flex justify-between">
          <p className="text-black">Have Not Account ?</p>
          <Link to="/signup" className=" text-blue-700">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
