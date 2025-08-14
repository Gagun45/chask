import type { TeamMessageInterface } from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import TeamMessage from "../TeamMessage/TeamMessage";
import { useEffect, useRef } from "react";

interface Props {
  messages: TeamMessageInterface[];
}

const MessagesContainer = ({ messages }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="overflow-y-auto custom-scrollbar" ref={containerRef}>
      {messages.map((message) => (
        <TeamMessage
          key={message.id}
          message={message.message}
          senderId={message.senderId}
          senderUsername={message.senderUsername}
        />
      ))}
    </div>
  );
};
export default MessagesContainer;
