import { LuLogOut } from "react-icons/lu";
import { Camera, Trash2, X, Loader2 } from "lucide-react";
import axiosInstance from "../../utils/axiosConfig.js";
import Cookies from 'js-cookie'
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useConversation from "../../stateManageMent/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import toast from 'react-hot-toast';

const Logout = ({ setAuthUser }) => {
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { selectedConversation } = useConversation();
  const { authUser } = useAuth();
  const fileInputRef = useRef(null);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/v1/users/logout", {});

      localStorage.removeItem("messenger");
      setAuthUser(null);
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logout successfully");
      navigate('/login');
    } catch (error) {
      toast.error("Error while logging out");
      console.log("error while logout", error.message)
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size must be under 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", file);

    setUploadLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/users/update-profile-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const updatedUser = response.data.user;

      // Update local storage and context
      const localData = JSON.parse(localStorage.getItem("messenger"));
      localData.user.profilePhoto = updatedUser.profilePhoto;
      localStorage.setItem("messenger", JSON.stringify(localData));

      setAuthUser(localData);
      toast.success("Profile photo updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile photo");
      console.error(error);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!window.confirm("Are you sure you want to remove your profile photo?")) return;
    
    setUploadLoading(true);
    try {
      await axiosInstance.post("/api/v1/users/remove-profile-photo");

      // Update local storage and context
      const localData = JSON.parse(localStorage.getItem("messenger"));
      localData.user.profilePhoto = "";
      localStorage.setItem("messenger", JSON.stringify(localData));

      setAuthUser(localData);
      toast.success("Profile photo removed successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove profile photo");
      console.error(error);
    } finally {
      setUploadLoading(false);
    }
  };

  const renderAvatar = (user, size = "w-10 h-10") => {
    if (user?.profilePhoto) {
      return (
        <img 
          src={user.profilePhoto} 
          alt={user.name} 
          className={`${size} rounded-full object-cover border border-slate-700 shrink-0 cursor-pointer hover:opacity-90 transition-opacity`} 
        />
      );
    }
    const initials = user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";
    return (
      <div className={`${size} rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-slate-700 cursor-pointer hover:bg-blue-700 transition-colors`}>
        {initials}
      </div>
    );
  };

  return (
    <>
      <div className={`bg-slate-950 w-12 md:w-[4%] flex flex-col items-center justify-between pt-6 pb-8 h-dvh ${selectedConversation ? "hidden md:flex" : "flex"}`}>
        {/* Profile Avatar Trigger */}
        <div onClick={() => setShowModal(true)} title="View Profile" className="cursor-pointer">
          {renderAvatar(authUser?.user, "w-8 h-8 md:w-9 md:h-9")}
        </div>

        {/* Logout Button */}
        <LuLogOut onClick={handleLogout} className="text-2xl text-white hover:bg-gray-700 rounded-lg p-1 cursor-pointer duration-200" size={32} />
      </div>

      {/* Profile Management Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-sm p-6 relative shadow-2xl flex flex-col items-center gap-6">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            <div className="text-center w-full">
              <h2 className="text-xl font-bold">Your Profile</h2>
              <p className="text-slate-400 text-sm mt-1">{authUser?.user?.email}</p>
            </div>

            {/* Large Avatar Preview with Upload Button Overlay */}
            <div className="relative group">
              {renderAvatar(authUser?.user, "w-28 h-28 text-3xl")}
              
              {uploadLoading && (
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              )}
            </div>

            <div className="w-full text-center">
              <p className="font-semibold text-lg">{authUser?.user?.name}</p>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex flex-col gap-3 w-full mt-2">
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-lg transition-colors font-medium cursor-pointer"
              >
                <Camera size={18} />
                Change Photo
              </button>

              {authUser?.user?.profilePhoto && (
                <button
                  onClick={handleRemovePhoto}
                  disabled={uploadLoading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-red-950/40 hover:text-red-400 disabled:opacity-50 text-slate-300 rounded-lg transition-colors font-medium border border-slate-700/60 cursor-pointer"
                >
                  <Trash2 size={18} />
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
