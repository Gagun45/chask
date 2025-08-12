"use client";

import LeaveButton from "./LeaveButton";
import JoinButton from "./JoinButton";

interface Props {
  teamId: string;
  isMember: boolean | undefined;
}

const TeamMembershipButton = ({ isMember, teamId }: Props) => {
  if (isMember === undefined) return <></>;
  if (isMember) return <LeaveButton teamId={teamId} />;
  return <JoinButton teamId={teamId}/>
};
export default TeamMembershipButton;
