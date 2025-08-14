"use client";

import type { teamWithMessages } from "@/utils/types";
import SendTeamMessage from "./SendTeamMessage/SendTeamMessage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import {
  selectTeamMessagesAllMessages,
  setInitialMessages,
  type TeamMessageInterface,
} from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import MessagesContainer from "./MessagesContainer/MessagesContainer";

interface Props {
  team: teamWithMessages;
}



const TeamChat = ({ team }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const formattedMessages: TeamMessageInterface[] = team.TeamMessage.map(
      (message) => ({
        id: message.id,
        message: message.message,
        senderId: message.senderId,
        senderUsername: message.sender.username,
      })
    );
    dispatch(setInitialMessages(formattedMessages));
  }, [team, dispatch]);

  const actualTeamMessages = useSelector(selectTeamMessagesAllMessages);
  return (
    <div className="flex flex-col h-full gap-4 ">
      <MessagesContainer messages={actualTeamMessages} />
      <SendTeamMessage teamPid={team.pid} />
    </div>
  );
};
export default TeamChat;
