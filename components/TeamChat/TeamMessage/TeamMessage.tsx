"use client";

import { useSession } from "next-auth/react";

interface Props {
  message: string;
  senderId: string;
  senderUsername: string;
}

const TeamMessage = ({ message, senderId, senderUsername }: Props) => {
  const { data } = useSession();
  const isMyMessage = data?.user?.id === senderId;
  return (
    <div
      className={`flex max-w-4/5 gap-2 ${isMyMessage ? "" : "ml-auto flex-row-reverse"}`}
    >
      <span className="font-bold">
        {senderUsername}
      </span>
      <span>{message}</span>
    </div>
  );
};
export default TeamMessage;
