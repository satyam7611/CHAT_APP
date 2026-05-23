import axiosInstance from "../../utils/axiosConfig";
import { Trash2, Download, X, Play, Pause } from "lucide-react";
import useConversation from "../../stateManageMent/useConversation.js";
import { useState, useRef, useEffect } from "react";

const VoicePlayer = ({ url, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Playback failed:", err);
      });
    }
  };

  const handleSliderChange = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const totalDuration = duration || (audioRef.current ? audioRef.current.duration : 0) || 0;

  return (
    <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-2.5 min-w-[200px] sm:min-w-[240px] mt-1 select-none" onClick={(e) => e.stopPropagation()}>
      <audio ref={audioRef} src={url} preload="metadata" />
      
      <button 
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm animate-none"
      >
        {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="ml-0.5" />}
      </button>

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <input 
          type="range"
          min={0}
          max={totalDuration || 100}
          value={currentTime}
          onChange={handleSliderChange}
          className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
      </div>
    </div>
  );
};

const Message = ({ message }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [showActions, setShowActions] = useState(false);
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

  const handleDelete = async (e) => {
    e.stopPropagation();
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
        <div 
          onClick={() => { if (!message.isDeleted && itsMe) setShowActions(!showActions); }}
          className={`chat-bubble relative ${chatColor} break-words cursor-pointer select-none max-w-[85%] sm:max-w-[75%] md:max-w-[70%] pb-1`}
        >
          {/* Render Trash icon to the left of the message if itsMe */}
          {itsMe && !message.isDeleted && (
            <button
              onClick={handleDelete}
              className={`absolute left-[-40px] md:-left-12 top-1/2 -translate-y-1/2 transition-opacity duration-300 p-2 text-red-400 hover:text-red-500 hover:bg-gray-800 rounded-full flex-shrink-0 ${showActions ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
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
                      onClick={(e) => { e.stopPropagation(); setShowLightbox(true); }}
                      className="max-w-[200px] sm:max-w-[250px] rounded-lg object-cover border border-gray-500/30 mt-1 cursor-pointer hover:opacity-90 transition-opacity"
                    />

                    {/* Full Screen Lightbox Overlay */}
                    {showLightbox && (
                      <div 
                        onClick={(e) => { e.stopPropagation(); setShowLightbox(false); }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                      >
                        {/* Top Control Bar */}
                        <div className="absolute top-4 right-4 flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
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
                            onClick={(e) => { e.stopPropagation(); setShowLightbox(false); }}
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
                          className="max-h-[90dvh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </>
                ) : message.fileType?.startsWith("video/") ? (
                  <video
                    src={message.fileUrl}
                    controls
                    className="max-w-[200px] sm:max-w-[280px] rounded-lg border border-gray-500/30 mt-1 focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : message.fileType?.startsWith("audio/") ? (
                  <VoicePlayer
                    url={message.fileUrl}
                    duration={message.duration}
                  />
                ) : (
                  <a
                    href={message.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg underline text-sm mt-1 hover:bg-gray-800"
                    onClick={(e) => e.stopPropagation()}
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