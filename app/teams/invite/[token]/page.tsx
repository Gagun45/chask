import TeamCard from "@/components/TeamCard/TeamCard";
import JoinButton from "@/components/TeamCard/TeamMembershipButton/JoinButton";
import { buttonVariants } from "@/components/ui/button";
import { getTeamByInviteToken } from "@/utils/actions/team.actions";

interface Props {
  params: Promise<{ token: string }>;
}

const InviteTeamPage = async ({ params }: Props) => {
  const token = (await params).token;
  if (!token) return <div>No token provided</div>;
  const res = await getTeamByInviteToken(token);
  if ("error" in res) {
    return <div>Team not found</div>;
  }

  const { isMember, team } = res;

  return (
    <div className="mx-auto space-y-4">
      <TeamCard team={team} className="w-fit" />
      {isMember ? (
        <span
          className={buttonVariants({ variant: "custom", className: "w-full" })}
        >
          Already joined!
        </span>
      ) : (
        <JoinButton teamId={team.id} className="w-full" />
      )}
    </div>
  );
};
export default InviteTeamPage;
