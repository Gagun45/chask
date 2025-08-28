"use client";

import { useCallback, useEffect, useState } from "react";
import TeamPageTabs from "../TeamPageTabs/TeamPageTabs";
import {
  checkMembership,
  getTeamWithMessagesByPid,
} from "@/utils/actions/team.actions";
import { redirect } from "next/navigation";
import type { teamWithMessages } from "@/utils/types";

interface Props {
  pid: string;
}

const TeamPageContent = ({ pid }: Props) => {
  const [team, setTeam] = useState<teamWithMessages | null>(null);
  const [messagesLeft, setMessagesLeft] = useState(0);
  const fetchContent = useCallback(async () => {
    const res = await getTeamWithMessagesByPid(pid);
    if (!res) return <span>Team not found</span>;
    const { team, messagesLeft } = res.data;
    setTeam(team);
    setMessagesLeft(messagesLeft);
    const isMember = await checkMembership(team.id);
    if (!isMember) redirect("/");
  }, [pid]);
  useEffect(() => {
    if (!pid) return;
    fetchContent();
  }, [pid, fetchContent]);
  if (!team) return null;
  return (
    <>
      <h1 className="text-center text-3xl font-extrabold">{team.name}</h1>
      <TeamPageTabs team={team} messagesLeft={messagesLeft} />
    </>
  );
};
export default TeamPageContent;
