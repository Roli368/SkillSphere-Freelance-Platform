import { useSelector } from "react-redux";
import { UserCircle } from "lucide-react";

function ConversationList({ conversations, selected, onSelect }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-2">
      {conversations.map((item) => {
        const other = item.participants.find(
          (p) => p._id !== user?._id && p._id !== user?.id
        );

        const isSelected = selected?._id === item._id;

        return (
          <div
            key={item._id}
            onClick={() => onSelect(item)}
            className={`group cursor-pointer rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 border ${
              isSelected
                ? "bg-brand-50 dark:bg-slate-800 border-brand-200 dark:border-slate-700 shadow-sm"
                : "bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent"
            }`}
          >
            <div className="relative">
              {other?.avatar ? (
                <img src={other.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover shadow-sm" />
              ) : (
                <UserCircle size={48} className="text-slate-300 dark:text-slate-600" />
              )}
              {/* Online indicator placeholder */}
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800"></div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className={`font-bold truncate text-base ${isSelected ? "text-brand-700 dark:text-white" : "text-slate-900 dark:text-slate-200"}`}>
                {other?.fullName || "Unknown User"}
              </h3>
              <p className={`mt-0.5 text-sm truncate ${isSelected ? "text-brand-600 dark:text-slate-400" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`}>
                {item.lastMessage || "No messages yet"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ConversationList;