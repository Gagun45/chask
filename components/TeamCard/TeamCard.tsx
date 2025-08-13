"use client";

import Image from "next/image";
import TeamMembershipButton from "./TeamMembershipButton/TeamMembershipButton";
import type { TeamWithCreatorAndCountMembers } from "@/utils/types";

interface Props {
  team: TeamWithCreatorAndCountMembers;
  isMember?: boolean | undefined;
}

const TeamCard = ({ team, isMember }: Props) => {
  return (
    <div className="flex flex-col border-2 p-4">
      <div className="relative size-24">
        <Image src={"https://github.com/shadcn.png"} alt="Team Logo" fill />
      </div>
      <span>Name: {team.name}</span>
      <span>Creator: {team.creator.name}</span>
      <span>Members: {team._count.members}</span>
      <TeamMembershipButton isMember={isMember} teamId={team.id} />
    </div>
  );
};
export default TeamCard;
