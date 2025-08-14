"use client";

import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addNewMessage,
  selectCurrentTeamId,
} from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import type { AppDispatch } from "@/redux/store";
import { sendTeamMessage } from "@/utils/actions/team.actions";
import { SendIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const SendTeamMessage = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const teamId = useSelector(selectCurrentTeamId);
  const [isPending, startTransaction] = useTransition();
  const onMessageSend = () => {
    startTransaction(async () => {
      if (!message) return;
      const res = await sendTeamMessage(teamId, message);
      setMessage("");

      if (res.error) {
        toast.error(res.error);
        return;
      }
      if (res.data) {
        dispatch(addNewMessage(res.data));
      }
    });
  };
  return (
    <div className="flex gap-4 mt-auto">
      <form action={onMessageSend} className="flex gap-4 w-full">
        <Input
          autoFocus
          placeholder="Message..."
          className="border-2 border-first placeholder:italic"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
        />
        {isPending ? (
          <LoadingButton className="w-20" />
        ) : (
          <Button className="w-20 text-second" disabled={!message}>
            <SendIcon />
            Send
          </Button>
        )}
      </form>
    </div>
  );
};
export default SendTeamMessage;
