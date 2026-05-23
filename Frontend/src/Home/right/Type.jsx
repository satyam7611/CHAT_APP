import { IoMdSend } from "react-icons/io";
import { useState, useRef } from "react";
import useSendMessage from "../../context/useSendMessage.js";
import { Paperclip, X, Mic, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const Type = () => {
  const [message, setMessage] = useState(""); 
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  
  const { loading, sendMessages } = useSendMessage();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
    if (!message.trim() && !file) return;

    sendMessages(message, file); 
    setMessage("");
    removeFile();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // Voice recording helpers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        clearInterval(timerIntervalRef.current);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Stop stream tracks
        stream.getTracks().forEach(track => track.stop());

        if (audioChunksRef.current.length === 0) return; // Discarded

        // Construct voice note file
        const audioFile = new File([audioBlob], `voice-note-${Date.now()}.webm`, { type: 'audio/webm' });
        
        // Get the recording duration at that specific moment
        sendMessages("", audioFile, recordingTime);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast.error("Microphone permission denied or unsupported browser");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      // Clear chunks so uploader doesn't fire
      audioChunksRef.current = [];
      mediaRecorderRef.current.stop();
      
      clearInterval(timerIntervalRef.current);
      setIsRecording(false);
      setRecordingTime(0);
      toast.success("Voice note discarded");
    }
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-900 border-t border-gray-700">
      {/* WhatsApp Style File Preview Window */}
      {file && (
        <div className="p-3 bg-gray-800 border-b border-gray-700 flex items-center gap-4">
          <div className="relative">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-gray-600" />
            ) : (
              <div className="h-16 w-16 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 text-xs text-center border border-gray-600 p-1 truncate cursor-default">
                {file.name}
              </div>
            )}
            <button 
              onClick={removeFile}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-lg"
            >
              <X size={14} />
            </button>
          </div>
          <p className="text-sm text-gray-400 truncate flex-1 max-w-[150px] sm:max-w-xs md:max-w-md">{file.name}</p>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 pb-[calc(10px+env(safe-area-inset-bottom))]">
        {isRecording ? (
          // Recording Audio UI Bar
          <div className="flex-1 flex items-center justify-between bg-gray-800 rounded-lg p-2.5 text-white transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide text-red-400 select-none">Recording</span>
              <span className="text-sm font-mono text-slate-300 select-none">{formatTime(recordingTime)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={cancelRecording}
                className="p-1.5 text-slate-400 hover:text-red-400 transition hover:bg-gray-700 rounded-full"
                title="Discard recording"
              >
                <Trash2 size={18} />
              </button>

              <button 
                onClick={stopRecording}
                className="p-2 text-white bg-blue-600 hover:bg-blue-500 transition rounded-full flex items-center justify-center cursor-pointer shadow-md shrink-0"
                title="Send voice note"
              >
                <IoMdSend size={16} />
              </button>
            </div>
          </div>
        ) : (
          // Normal Message Input UI Bar
          <>
            <input 
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-white transition rounded-full hover:bg-gray-800 shrink-0"
              title="Attach file"
            >
              <Paperclip size={22} className="rotate-45" />
            </button>

            <input
              type="text"
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={file ? "Add a caption..." : "Type here"}
              className="flex-1 bg-gray-800 text-white p-3 rounded-lg outline-none text-base"
            />

            {message.trim() || file ? (
              <button 
                onClick={handleSend} 
                disabled={loading}
                className="p-2 rounded-full transition shrink-0 text-blue-500 hover:text-blue-400 hover:bg-gray-800 cursor-pointer"
                title="Send message"
              >
                <IoMdSend className="text-2xl" />
              </button>
            ) : (
              <button 
                onClick={startRecording} 
                disabled={loading}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition rounded-full shrink-0 cursor-pointer"
                title="Record voice message"
              >
                <Mic size={22} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Type;