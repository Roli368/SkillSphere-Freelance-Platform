import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getConversations } from "../../services/chatApi";
import { getSocket } from "../../services/socket";
import ConversationList from "../../components/chat/ConversationList";
import ChatWindow from "../../components/chat/ChatWindow";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

function Chat() {
  const { user } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      const { data } = await getConversations();
      setConversations(data.data);
    } catch {
      toast.error("Unable to load chats");
    }
  };

  useEffect(() => {
    load();
    if (!user) return;

    const socket = getSocket();
    socket.connect();
    socket.emit("join", user._id || user.id);

    const handleUpdate = ({ conversationId, message }) => {
      setConversations((prev) => {
        const index = prev.findIndex(c => c._id === conversationId);
        if (index > -1) {
          const newConvs = [...prev];
          newConvs[index] = { ...newConvs[index], lastMessage: message.text, updatedAt: new Date().toISOString() };
          // Sort to bring updated conversation to top
          return newConvs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }
        return prev;
      });
    };

    socket.on("conversationUpdated", handleUpdate);

    return () => {
      socket.off("conversationUpdated", handleUpdate);
    };
  }, [user]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-[calc(100vh-120px)] w-full gap-6"
    >
      <div className="w-1/3 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="text-brand-500" />
            Messages
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <ConversationList
            conversations={conversations}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
      </div>

      <div className="flex-1 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col relative">
        {selected ? (
          <ChatWindow conversation={selected} />
        ) : (
          <div className="flex flex-col h-full items-center justify-center text-slate-500 dark:text-slate-400">
            <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 border border-slate-100 dark:border-slate-700">
              <MessageSquare size={32} className="text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-lg font-medium">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Chat;