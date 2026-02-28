import { IoMdSend } from "react-icons/io";

const Type = () => {
  return (
    // <div className="fixed bottom-0 left-118 right-0 bg-gray-900 p-3 z-50">
   
    //   <div className="flex items-center gap-3">
    //     <input
    //       type="text"
    //       placeholder="Type here"
    //       className="flex-1 bg-gray-800 text-white p-3 rounded-lg outline-none"
    //     />
    //     <IoMdSend className="text-2xl text-white cursor-pointer hover:text-blue-400 transition" />
    //   </div>
    // </div>
    
    <div className="bg-gray-900 p-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Type here"
          className="flex-1 bg-gray-800 text-white p-3 rounded-lg outline-none"
        />
        <IoMdSend className="text-2xl text-white cursor-pointer hover:text-blue-400 transition" />
      </div>
    </div>

  );
};

export default Type;