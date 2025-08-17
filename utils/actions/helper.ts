import type { TeamMessageInterface } from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import { auth } from "../auth";
import type { TeamMessageWithSender } from "../types";

export const getUserId = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Authorized only");
  return userId;
};

export const formatMessages = (
  messages: TeamMessageWithSender[]
): TeamMessageInterface[] => {
  return messages.map((message) => ({
    id: message.id,
    createdAt: message.createdAt.toISOString(),
    message: message.message,
    senderId: message.senderId,
    senderUsername: message.sender.username,
  }));
};

export const generateIntPid = () => {
  return Math.floor(Math.random() * 10000);
};
