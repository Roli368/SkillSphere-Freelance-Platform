import { FileText } from "lucide-react";

function MessageBubble({ message, myId }) {
  const mine = message.sender._id === myId;

  return (
    <div className={`mb-4 flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] lg:max-w-[60%] rounded-2xl px-5 py-3 shadow-sm ${
          mine
            ? "bg-brand-600 text-white rounded-br-sm"
            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-200 dark:border-slate-700/50"
        }`}
      >
        {message.fileUrl && (
          <div className="mb-2">
            {message.fileType === "image" ? (
              <img 
                src={message.fileUrl} 
                alt="Attachment" 
                className="max-w-full rounded-lg max-h-64 object-cover" 
              />
            ) : (
              <a 
                href={message.fileUrl} 
                target="_blank" 
                rel="noreferrer" 
                className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-colors ${
                  mine ? "bg-white/20 hover:bg-white/30" : "bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600"
                }`}
              >
                <FileText size={20} />
                <span>View Attachment</span>
              </a>
            )}
          </div>
        )}

        {message.text && (
          <p className="text-sm md:text-base leading-relaxed break-words">{message.text}</p>
        )}

        <p className={`mt-1.5 text-[10px] uppercase font-semibold tracking-wider ${mine ? "text-brand-200" : "text-slate-500 dark:text-slate-500"}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;