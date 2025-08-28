import { Button } from "@/components/ui/button";
import {
  selectTeamTasksColumns,
  selectTeamTasksTasks,
} from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import { useSelector } from "react-redux";
import { selectCurrentTeamId } from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import { saveTeamTasks } from "@/utils/actions/team.actions";
import { toast } from "sonner";
import React from "react";
import { store } from "@/redux/store";

const SaveChangesBtn = () => {
  const currentTeamId = useSelector(selectCurrentTeamId);
  const onSaveTeamTasks = async () => {
    const state = store.getState();
    const columns = selectTeamTasksColumns(state);
    const tasks = selectTeamTasksTasks(state);
    const res = await saveTeamTasks(columns, tasks, currentTeamId);
    if (res.success) {
      toast.success(res.success);
    }
  };
  return <Button onClick={onSaveTeamTasks}>Save changes</Button>;
};
export default SaveChangesBtn;
