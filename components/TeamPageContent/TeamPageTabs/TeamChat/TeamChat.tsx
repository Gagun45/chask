"use client";

import SendTeamMessage from "./SendTeamMessage/SendTeamMessage";

import MessagesContainer from "./MessagesContainer/MessagesContainer";
import LoadMoreBtn from "./MessagesContainer/LoadMoreBtn/LoadMoreBtn";

const TeamChat = () => {
  return (
    <div className="flex flex-col h-full gap-4 ">
      <LoadMoreBtn />
      <MessagesContainer />
      <SendTeamMessage />
    </div>
  );
};
export default TeamChat;
