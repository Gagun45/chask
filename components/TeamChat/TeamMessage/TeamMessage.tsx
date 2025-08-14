"use client";

import { useSession } from "next-auth/react";
import DeleteMessage from "./DeleteMessage/DeleteMessage";

interface Props {
  message: string;
  senderId: string;
  senderUsername: string;
  messageId: string;
}

const TeamMessage = ({
  message,
  senderId,
  senderUsername,
  messageId,
}: Props) => {
  const { data, status } = useSession();
  const isMyMessage = data?.user?.id === senderId;
  if (status === "loading") return <></>;
  return (
    <div
      className={`flex  max-w-4/5 gap-2 group rounded-md px-1 py-0.5 hover:bg-accent-foreground/25 ${
        isMyMessage ? "" : "ml-auto flex-row-reverse"
      }`}
    >
      <span className="font-bold">{senderUsername}</span>
      <span>{message}</span>
      {isMyMessage && <DeleteMessage messageId={messageId} />}
    </div>
  );
};
export default TeamMessage;
