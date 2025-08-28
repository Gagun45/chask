import { Button } from "@/components/ui/button";
import { deleteMessage } from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import type { AppDispatch } from "@/redux/store";
import { deleteTeamMessage } from "@/utils/actions/team.actions";
import { Trash2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface Props {
  messageId: string;
}

const DeleteMessage = ({ messageId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const onMessageDelete = async () => {
    const res = await deleteTeamMessage(messageId);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    if (res.success) {
      toast.success(res.success);
      dispatch(deleteMessage(messageId));
    }
  };
  return (
    <Button
      onClick={onMessageDelete}
      size={"icon"}
      variant={"ghost"}
      className="ml-auto hover:bg-destructive size-6 my-auto shrink-0 group-hover:flex flex sm:hidden"
    >
      <Trash2Icon />
    </Button>
  );
};
export default DeleteMessage;
