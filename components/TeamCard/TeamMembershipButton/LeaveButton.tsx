"use client";

import { Button } from "@/components/ui/button";
import { leaveTeam } from "@/redux/features/myTeams/myTeamsSlice";
import { leaveATeam } from "@/utils/actions/team.actions";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const LeaveButton = ({ teamId }: { teamId: string }) => {
  const dispatch = useDispatch();
  const onLeave = async () => {
    const res = await leaveATeam(teamId);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    if (res.success) {
      toast.success(res.success);
      dispatch(leaveTeam(teamId));
    }
  };
  return (
    <Button onClick={onLeave} variant={"destructive"}>
      Leave
    </Button>
  );
};
export default LeaveButton;
