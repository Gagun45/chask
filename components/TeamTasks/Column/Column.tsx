import { Button } from "@/components/ui/button";
import { selectCurrentTeamId } from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import {
  addNewTask,
  deleteColumn,
  type TeamTaskColumn,
  type TeamTaskSingle,
} from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import type { AppDispatch } from "@/redux/store";
import { generateIntPid } from "@/utils/actions/helper";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "./TaskCard/TaskCard";

interface Props {
  column: TeamTaskColumn;
  tasks: TeamTaskSingle[];
}

const Column = ({ column, tasks }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTeamId = useSelector(selectCurrentTeamId);
  const onDeleteColumn = () => {
    dispatch(deleteColumn({ columnPid: column.pid }));
  };
  const onCreateNewTask = () => {
    const newTask: TeamTaskSingle = {
      content: `Task ${tasks.length + 1}`,
      pid: generateIntPid(),
      teamColumnPid: column.pid,
      teamId: currentTeamId,
    };
    dispatch(addNewTask({ task: newTask }));
  };
  return (
    <div className="h-full flex flex-col w-42 bg-blue-300">
      <div className="flex justify-between">
        <span>{column.title}</span>
        <Button onClick={onCreateNewTask}>New</Button>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.pid} />
        ))}
      </div>
      <Button onClick={onDeleteColumn} className="mt-auto">
        Delete column
      </Button>
    </div>
  );
};
export default Column;
