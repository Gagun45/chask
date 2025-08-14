"use client";

import { useSession } from "next-auth/react";
import DeleteMessage from "./DeleteMessage/DeleteMessage";
import type { TeamMessageInterface } from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import React from "react";

const TeamMessage = ({
  message,
  senderId,
  senderUsername,
  id,
  createdAt,
}: TeamMessageInterface) => {
  const { data, status } = useSession();
  const isMyMessage = data?.user?.id === senderId;
  console.log("qweqweqwe", message);
  if (status === "loading") return <></>;
  return (
    <div
      className={`flex items-center break-all max-w-4/5 gap-1 group rounded-md px-1 py-0.5 hover:bg-accent-foreground/25 ${
        isMyMessage ? "" : "ml-auto flex-row-reverse"
      }`}
    >
      <time className="text-xs shrink-0 italic">{createdAt.slice(11, 16)}</time>
      <span className="font-bold shrink-0">{senderUsername}</span>
      <span>{message}</span>
      {isMyMessage && <DeleteMessage messageId={id} />}
    </div>
  );
};
export default React.memo(TeamMessage);
