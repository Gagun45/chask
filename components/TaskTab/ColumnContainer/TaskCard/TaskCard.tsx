import { Button } from "@/components/ui/button";
import type { Task } from "../../TaskTab";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  onDeleteTask: (id: number) => void;
}

const TaskCard = ({ task, onDeleteTask }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging)
    return (
      <div
        className="h-16 w-full bg-blue-700 border-1 border-red-500 opacity-40 rounded-md flex items-center"
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        {task.content}
        <Button onClick={() => onDeleteTask(task.id)}>Delete Task</Button>
      </div>
    );
  return (
    <div
      className="h-16 w-full bg-blue-700 rounded-md flex items-center"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {task.content}
      <Button onClick={() => onDeleteTask(task.id)}>Delete Task</Button>
    </div>
  );
};
export default TaskCard;
