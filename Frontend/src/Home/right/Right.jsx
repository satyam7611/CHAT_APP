import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import useConversation from "../../stateManageMent/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { MessageSquare } from "lucide-react";
import useListenMessages from "../../context/useListenMessages.js";

const Right = () => {
    const { selectedConversation } = useConversation();
    useListenMessages();

    return (
        <div className={`flex-1 text-white bg-slate-950 flex flex-col h-screen ${!selectedConversation ? "hidden md:flex" : "flex"}`}>
            {selectedConversation ? (
                <>
                    <Chatuser />
                    <Messages />
                    <Type />
                </>
            ) : (
                <NoChatSelected />
            )}
        </div>
    );
};

const NoChatSelected = () => {
    const { authUser } = useAuth();
    return (
        <div className="flex w-full h-full flex-col items-center justify-center bg-slate-900 border-l border-slate-800">
            <div className="text-center sm:text-lg md:text-xl text-slate-200 font-semibold flex flex-col items-center gap-4">
                <div className="relative">
                    <MessageSquare className="w-24 h-24 text-slate-700 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-slate-800 rounded-full opacity-50 blur-sm"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-2xl font-bold tracking-tight">Welcome, {authUser?.name || "User"}! 👋🏻</p>
                    <p className="text-slate-400 text-sm md:text-base font-normal mt-2">
                        Select a chat from the sidebar to start messaging.
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                        Send and receive messages seamlessly.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Right;