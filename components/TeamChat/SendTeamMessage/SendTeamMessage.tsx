"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendTeamMessage } from "@/utils/actions/team.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SendTeamMessage = ({ teamPid }: { teamPid: string }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const onMessageSend = async () => {
    if (!message) return;
    const res = await sendTeamMessage(teamPid, message);
    setMessage("");
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
    <div className="flex gap-4">
      <Input
        className="border-2 border-first"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={onMessageSend}>Send</Button>
    </div>
  );
};
export default SendTeamMessage;
