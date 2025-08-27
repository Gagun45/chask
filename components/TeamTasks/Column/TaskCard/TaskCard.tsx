import { Button } from "@/components/ui/button";
import {
  deleteTask,
  type TeamTaskSingle,
} from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import type { AppDispatch } from "@/redux/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";

interface Props {
  task: TeamTaskSingle;
}

const TaskCard = ({ task }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const onDeleteTask = () => {
    dispatch(deleteTask({ taskPid: task.pid }));
  };
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.pid, data: { type: "Task", task } });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging)
    return (
      <div
        className="w-36 h-12 flex justify-between items-center bg-blue-700 rounded-md opacity-40 border-1 border-red-500"
        style={style}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
      >
        <span>{task.content}</span>
        <Button onClick={onDeleteTask}>Delete</Button>
      </div>
    );

  return (
    <div
      className="w-full h-fit flex justify-between items-center bg-blue-700 rounded-md"
      style={style}
      ref={setNodeRef}
    >
      <span {...attributes} {...listeners}>
        {task.content}
      </span>
      <Button onClick={onDeleteTask}>Delete</Button>
    </div>
  );
};
export default TaskCard;
