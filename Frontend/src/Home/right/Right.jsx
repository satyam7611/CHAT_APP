import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";

const Right=()=>{
    return(
        // <div className=" w-[70%]  text-white bg-slate-950 overflow-y-auto "style={{height:"calc(100vh)"}}>
        <div className="flex-1 text-white bg-slate-950 flex flex-col h-screen">
            <Chatuser/>
            <Messages/>
            <Type/>
        </div>
    )
}

export default Right;