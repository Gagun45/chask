import TeamPageContent from "@/components/TeamPageContent/TeamPageContent";

interface Props {
  params: Promise<{ pid: string }>;
}

const TeamPage = async ({ params }: Props) => {
  const pid = (await params).pid;
  return (
    <div className="mx-auto max-w-[1024px] w-full flex items-center flex-col gap-4">
      <TeamPageContent pid={pid}/>
    </div>
  );
};
export default TeamPage;
