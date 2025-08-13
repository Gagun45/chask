import {
  checkMembership,
  getTeamWithMessagesByPid,
} from "@/utils/actions/team.actions";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamChat from "@/components/TeamChat/TeamChat";

interface Props {
  params: Promise<{ pid: string }>;
}

const TeamPage = async ({ params }: Props) => {
  const pid = (await params).pid;
  const team = await getTeamWithMessagesByPid(pid);
  if (!team) return <span>Team not found</span>;
  const isMember = await checkMembership(team.id);
  if (!isMember) redirect("/");

  return (
    <div className="mx-auto max-w-[1024px] w-full flex items-center flex-col gap-4">
      <h1 className="text-center text-3xl font-extrabold">{team.name}</h1>

      <Tabs defaultValue="chat" className="w-9/10">
        <TabsList className="mx-auto gap-8 bg-first">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="teamPageTabsContent">
          <TeamChat team={team} />
        </TabsContent>
        <TabsContent value="tasks" className="teamPageTabsContent">
          Team tasks
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default TeamPage;
