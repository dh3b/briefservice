import { formatTime } from "@/lib/formatTime";

interface ChatBubbleProps {
  content: string;
  translatedContent?: string;
  isTranslated: boolean;
  isOwnMessage: boolean;
  timestamp: string;
}

const ChatBubble = ({ content, translatedContent, isTranslated, isOwnMessage, timestamp }: ChatBubbleProps) => {
  const displayContent = isTranslated && translatedContent ? translatedContent : content;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] flex flex-col gap-0.5 ${isOwnMessage ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm ${
            isOwnMessage
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-secondary text-secondary-foreground rounded-bl-md"
          }`}
          style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
        >
          {isTranslated && translatedContent ? (
            <span className="font-semibold">{displayContent}</span>
          ) : (
            displayContent
          )}
        </div>
        <span className={`text-[10px] text-muted-foreground px-1 ${isOwnMessage ? "text-right" : "text-left"}`}>
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
