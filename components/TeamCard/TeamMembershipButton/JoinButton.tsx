import { Button } from "@/components/ui/button";
import { joinATeam } from "@/utils/actions/team.actions"
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface Props {
  teamId: string;
}

const JoinButton = ({ teamId }: Props) => {
  const onJoin = async () => {
    const res = await joinATeam(teamId);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    if (res.success) {
      toast.success(res.success);
      redirect(`/teams/team/${res.teamName}`);
    }
  };
  return <Button onClick={onJoin}>Join</Button>;
};
export default JoinButton;
