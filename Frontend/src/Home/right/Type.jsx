import { IoMdSend } from "react-icons/io";
import { useState, useRef } from "react";
import useSendMessage from "../../context/useSendMessage.js";
import { Paperclip, X } from "lucide-react";

const Type = () => {
  const [message, setMessage] = useState(""); 
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
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
          <p className="text-sm text-gray-400 truncate max-w-[200px]">{file.name}</p>
        </div>
      )}

      <div className="flex items-center gap-3 p-3">
        <input 
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-400 hover:text-white transition rounded-full hover:bg-gray-800"
        >
          <Paperclip size={22} className="rotate-45" />
        </button>

        <input
          type="text"
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={file ? "Add a caption..." : "Type here"}
          className="flex-1 bg-gray-800 text-white p-3 rounded-lg outline-none"
        />

        <button 
          onClick={handleSend} 
          disabled={loading || (!message.trim() && !file)}
          className={`p-2 rounded-full transition ${(!message.trim() && !file) ? "text-gray-600" : "text-blue-500 hover:text-blue-400 hover:bg-gray-800"}`}
        >
          <IoMdSend className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Type;