import { Button } from "@/components/ui/button";
import { fetchMyTeams } from "@/redux/features/myTeams/myTeamsSlice";
import type { AppDispatch } from "@/redux/store";
import { joinATeam } from "@/utils/actions/team.actions";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface Props {
  teamId: string;
}

const JoinButton = ({ teamId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const onJoin = async () => {
    const res = await joinATeam(teamId);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    if (res.success) {
      toast.success(res.success);
      dispatch(fetchMyTeams());
      redirect(`/teams/team/${res.teamPid}`);
    }
  };
  return <Button onClick={onJoin}>Join</Button>;
};
export default JoinButton;
