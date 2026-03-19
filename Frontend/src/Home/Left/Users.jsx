import User from "./User";
import useConversation from "../../stateManageMent/useConversation.js"
const Users = ({ id,name,email}) => {
  const {selectedConversation,setSelectedConversation}=useConversation();
  const isSelected=selectedConversation?._id===id;

  return (
    <div className={`hover:bg-slate-600 duration-300  ${
      isSelected ?"bg-slate-700" : ""
    }`} onClick={()=>setSelectedConversation({_id:id,name,email})}>
      <div className="flex space-x-4 px-6 py-7  hover:bg-slate-600 duration-300 cursor-pointer ">
        <div className="avatar avatar-online">
          <div className="w-10 md:w-14 rounded-full">
            {/* <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" /> */}
            <img src="/IMG_20251209_211011.jpg" alt="" />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{name}</h1>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
};


export default  Users;