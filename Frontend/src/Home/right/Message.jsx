import axiosInstance from "../../utils/axiosConfig";
import { Trash2, Download, X } from "lucide-react";
import useConversation from "../../stateManageMent/useConversation.js";
import { useState } from "react";

const Message = ({ message }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const authUser = JSON.parse(localStorage.getItem("messenger"));
  const { deleteMessageFromStore } = useConversation();

  const itsMe =
    message.senderId?.toString() === authUser?.user?.id?.toString();

  const chatName = itsMe ? "chat-end" : "chat-start";
  // Override color if deleted
  const chatColor = message.isDeleted
    ? "bg-gray-600/50 text-gray-400 italic"
    : itsMe
      ? "bg-blue-400 text-white"
      : "bg-gray-700 text-white";

  const handleDelete = async () => {
    try {
      await axiosInstance.post(`/api/message/delete/${message._id}`);
      // Update local state instantly after successful deletion
      deleteMessageFromStore(message._id);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "";

  return (
    <div className="px-2 py-1">
      <div className={`chat ${chatName} group`}>
        <div className={`chat-bubble relative ${chatColor} break-words max-w-[70%] sm:max-w-md md:max-w-lg lg:max-w-xl pb-1`}>
          {/* Render Trash icon to the left of the message if itsMe */}
          {itsMe && !message.isDeleted && (
            <button
              onClick={handleDelete}
              className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-red-400 hover:text-red-500 hover:bg-gray-800 rounded-full flex-shrink-0"
              title="Delete for everyone"
            >
              <Trash2 size={16} />
            </button>
          )}

          {message.isDeleted ? (
            <div className="flex items-end justify-between gap-3 pt-1">
              <span className="flex items-center gap-1">
                <span className="text-[10px]">🚫</span> This message was deleted
              </span>
              <span className="text-[9px] shrink-0 opacity-50">{formattedTime}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {message.fileUrl && (
                message.fileType?.startsWith("image/") ? (
                  <>
                    <img
                      src={message.fileUrl}
                      alt="Attachment"
                      onClick={() => setShowLightbox(true)}
                      className="max-w-[200px] sm:max-w-[250px] rounded-lg object-cover border border-gray-500/30 mt-1 cursor-pointer hover:opacity-90 transition-opacity"
                    />

                    {/* Full Screen Lightbox Overlay */}
                    {showLightbox && (
                      <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
                        {/* Top Control Bar */}
                        <div className="absolute top-4 right-4 flex items-center gap-4">
                          <a
                            href={message.fileUrl}
                            download={`Image-${message._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-700 transition cursor-pointer flex items-center justify-center shrink-0"
                            title="Download Image"
                          >
                            <Download size={24} />
                          </a>
                          <button
                            onClick={() => setShowLightbox(false)}
                            className="p-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-700 hover:text-red-400 transition cursor-pointer flex items-center justify-center shrink-0"
                            title="Close preview"
                          >
                            <X size={24} />
                          </button>
                        </div>

                        {/* Image */}
                        <img
                          src={message.fileUrl}
                          alt="Full Screen Attachment"
                          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={message.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg underline text-sm mt-1 hover:bg-gray-800"
                  >
                    📎 Download Attachment
                  </a>
                )
              )}

              <div className="flex items-end justify-between gap-3 min-w-[50px]">
                {message.message ? (
                  <span className="pt-0.5 flex-1 min-w-0 break-words whitespace-pre-wrap">{message.message}</span>
                ) : (
                  <span></span> /* Empty span for flex-between spacing if only an image exists */
                )}
                <span className={`text-[9px] shrink-0 font-medium ${itsMe ? "text-blue-100/80" : "text-gray-300/80"}`}>
                  {formattedTime}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;