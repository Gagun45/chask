import {
  addNewColumn,
  selectTeamTasksColumns,
  selectTeamTasksTasks,
  type TeamTaskColumn,
} from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { selectCurrentTeamId } from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import type { AppDispatch } from "@/redux/store";
import Column from "./Column/Column";
import { saveTeamTasks } from "@/utils/actions/team.actions";
import { toast } from "sonner";
import { generateIntPid } from "@/utils/actions/helper";

const TeamTasks = () => {
  const tasks = useSelector(selectTeamTasksTasks);
  const currentTeamId = useSelector(selectCurrentTeamId);
  const columns = useSelector(selectTeamTasksColumns);
  const dispatch = useDispatch<AppDispatch>();

  const onAddNewColumn = () => {
    const newColumn: TeamTaskColumn = {
      pid: generateIntPid(),
      teamId: currentTeamId,
      title: `Column ${columns.length + 1}`,
    };
    dispatch(addNewColumn({ ...newColumn }));
  };

  const onSaveTeamTasks = async () => {
    const res = await saveTeamTasks(columns, tasks, currentTeamId);
    if (res.success) {
      toast.success(res.success);
    }
  };
  return (
    <div className="flex flex-col h-full gap-2">
      <Button onClick={onAddNewColumn}>Add column</Button>
      <div className="flex bg-green-300 h-full gap-2">
        {columns.map((col) => (
          <Column
            key={col.pid}
            column={col}
            tasks={tasks.filter((task) => task.teamColumnPid === col.pid)}
          />
        ))}
      </div>
      <Button onClick={onSaveTeamTasks}>Save changes</Button>
    </div>
  );
};
export default TeamTasks;
