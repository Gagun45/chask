"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addMessage } from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import type { AppDispatch } from "@/redux/store";
import { sendTeamMessage } from "@/utils/actions/team.actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const SendTeamMessage = ({ teamPid }: { teamPid: string }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const onMessageSend = async () => {
    if (!message) return;
    const res = await sendTeamMessage(teamPid, message);
    setMessage("");

    if (res.error) {
      toast.error(res.error);
      return;
    }
    if (res.data) {
      toast.success("Message sent");
      console.log(res.data);
      dispatch(addMessage(res.data));
    }
  };
  return (
    <div className="flex gap-4 mt-auto">
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
