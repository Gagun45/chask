import { Button } from "@/components/ui/button";
import {
  addOldMessages,
  selectCurrentTeamId,
  selectMessagesLeft,
  selectTeamMessagesAllMessages,
  setMessagesLeft,
  type TeamMessageInterface,
} from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import type { AppDispatch } from "@/redux/store";
import { loadMoreTeamMessages } from "@/utils/actions/team.actions";
import { useDispatch, useSelector } from "react-redux";

const LoadMoreBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const messagesLeft = useSelector(selectMessagesLeft);
  const currentTeamId = useSelector(selectCurrentTeamId);
  const messages = useSelector(selectTeamMessagesAllMessages);
  const lastMessage = messages[messages.length - 1];
  
  const onLoadMore = async () => {
    if (!currentTeamId) return;
    const res = await loadMoreTeamMessages(
      currentTeamId,
      new Date(lastMessage.createdAt)
    );
    const oldMessages = res?.data.messages;
    const oldMessagesLeft = res?.data.messagesLeft;
    if (typeof oldMessagesLeft === "number")
      dispatch(setMessagesLeft(oldMessagesLeft));

    if (oldMessages) {
      const formattedMessages: TeamMessageInterface[] = oldMessages.map(
        (message) => ({
          id: message.id,
          createdAt: message.createdAt.toISOString(),
          message: message.message,
          senderId: message.senderId,
          senderUsername: message.sender.username,
        })
      );
      dispatch(addOldMessages(formattedMessages));
    }
  };
  return (
    <Button onClick={onLoadMore} disabled={!messagesLeft}>
      Load older messages
    </Button>
  );
};
export default LoadMoreBtn;
