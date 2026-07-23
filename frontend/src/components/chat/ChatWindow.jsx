import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  getMessages,
  sendMessage,
} from "../../services/chatApi";
import { getSocket } from "../../services/socket";

import MessageBubble from "./MessageBubble";

import { UserCircle, Send, MoreVertical, Image as ImageIcon, X } from "lucide-react";

function ChatWindow({ conversation }) {
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const otherUser = conversation?.participants?.find(
    (p) => p._id !== user?._id && p._id !== user?.id
  );

  const load = async () => {
    try {
      const { data } = await getMessages(conversation._id);
      setMessages(data.data);
    } catch {
      toast.error("Unable to load messages");
    }
  };

  useEffect(() => {
    load();

    const socket = getSocket();
    socket.connect();
    socket.emit("joinConversation", conversation._id);

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.disconnect();
    };
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setFile(selected);
      if (selected.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(selected));
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

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim() && !file) return;
    
    setIsSending(true);
    try {
      let payload;
      
      if (file) {
        payload = new FormData();
        payload.append("text", text);
        payload.append("attachment", file);
      } else {
        payload = { text };
      }

      await sendMessage(conversation._id, payload);
      setText("");
      removeFile();
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            {otherUser?.avatar ? (
              <img src={otherUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <UserCircle size={40} className="text-slate-300 dark:text-slate-600" />
            )}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></div>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              {otherUser?.fullName || "Conversation"}
            </h3>
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Online</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50/30 dark:bg-slate-900 flex flex-col">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} myId={user?._id || user?.id} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        
        {/* Preview Area */}
        {file && (
          <div className="mb-3 flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl relative max-w-sm">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
            ) : (
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-xs text-slate-500 text-center p-1 break-all">
                {file.name.substring(0, 15)}...
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={removeFile}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <form 
          onSubmit={handleSend}
          className="flex items-end gap-2 bg-slate-100 dark:bg-slate-800 rounded-3xl p-2 pl-4 border border-transparent focus-within:border-brand-500/50 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*,.pdf,.doc,.docx"
          />
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-400 hover:text-brand-500 transition-colors mb-1"
          >
            <ImageIcon size={20} />
          </button>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none outline-none resize-none py-3 px-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm md:text-base custom-scrollbar"
            rows="1"
          />

          <button
            type="submit"
            disabled={(!text.trim() && !file) || isSending}
            className="p-3 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:hover:bg-brand-600 mb-0.5 shadow-sm"
          >
            {isSending ? (
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send size={18} className="translate-x-[1px] translate-y-[-1px]" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;