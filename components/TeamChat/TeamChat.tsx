import type { teamWithMessages } from "@/utils/types";
import SendTeamMessage from "./SendTeamMessage/SendTeamMessage";
import TeamMessage from "./TeamMessage/TeamMessage";

interface Props {
  team: teamWithMessages;
}

const TeamChat = ({ team }: Props) => {
  return (
    <div className="flex flex-col h-full gap-4 ">
      <div className="overflow-y-auto custom-scrollbar">
        {team.TeamMessage.map((message) => (
          <TeamMessage
            key={message.id}
            message={message.message}
            senderId={message.senderId}
            senderUsername={message.sender.username}
          />
        ))}
      </div>
      <SendTeamMessage teamPid={team.pid} />
    </div>
  );
};
export default TeamChat;
