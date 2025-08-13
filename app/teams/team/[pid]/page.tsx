import { checkMembership, getTeamByPid } from "@/utils/actions/team.actions";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  params: Promise<{ pid: string }>;
}

const TeamPage = async ({ params }: Props) => {
  const pid = (await params).pid;
  const team = await getTeamByPid(pid);
  if (!team) return <span>Team not found</span>;
  const isMember = await checkMembership(team.id);
  if (!isMember) redirect("/");
  return (
    <div className="bg-red-400 w-full flex items-center flex-col gap-4">
      <h1 className="text-center">{team.name}</h1>

      <Tabs defaultValue="chat" className="w-9/10 bg-blue-500">
        <TabsList className="mx-auto gap-8">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="teamPageTabsContent">
          Team Chat
        </TabsContent>
        <TabsContent value="tasks" className="teamPageTabsContent">
          Team tasks
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default TeamPage;
