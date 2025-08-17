import { Button } from "@/components/ui/button";
import {
  deleteTask,
  type TeamTaskSingle,
} from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import type { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

interface Props {
  task: TeamTaskSingle;
}

const TaskCard = ({ task }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const onDeleteTask = () => {
    dispatch(deleteTask({ taskPid: task.pid }));
  };
  return (
    <div className="w-full h-12 flex justify-between items-center bg-blue-700 rounded-md">
      <span>{task.content}</span>
      <Button onClick={onDeleteTask}>Delete</Button>
    </div>
  );
};
export default TaskCard;
