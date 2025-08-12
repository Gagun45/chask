"use client";

import { Button } from "@/components/ui/button";
import { leaveATeam } from "@/utils/actions/team.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LeaveButton = ({ teamId }: { teamId: string }) => {
  const router = useRouter();
  const onLeave = async () => {
    const res = await leaveATeam(teamId);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    if (res.success) {
      toast.success(res.success);
      router.refresh();
    }
  };
  return (
    <Button onClick={onLeave} variant={"destructive"}>
      Leave
    </Button>
  );
};
export default LeaveButton;
