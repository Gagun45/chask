import {
  checkMembership,
  getTeamWithMessagesByPid,
} from "@/utils/actions/team.actions";
import { redirect } from "next/navigation";
import TeamPageTabs from "@/components/TeamPageTabs/TeamPageTabs";

interface Props {
  params: Promise<{ pid: string }>;
}

const TeamPage = async ({ params }: Props) => {
  const pid = (await params).pid;
  const res = await getTeamWithMessagesByPid(pid);
  if (!res) return <span>Team not found</span>;
  const { team, messagesLeft } = res.data;
  const isMember = await checkMembership(team.id);
  if (!isMember) redirect("/");

  return (
    <div className="mx-auto max-w-[1024px] w-full flex items-center flex-col gap-4">
      <h1 className="text-center text-3xl font-extrabold">{team.name}</h1>
      <TeamPageTabs team={team} messagesLeft={messagesLeft} />
    </div>
  );
};
export default TeamPage;
