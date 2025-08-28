import { Button, buttonVariants } from "@/components/ui/button";
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
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ColumnTitleInput from "./ColumnTitleInput";
import { MoveIcon } from "lucide-react";

interface Props {
  column: TeamTaskColumn;
  tasks: TeamTaskSingle[];
}

const Column = ({ column, tasks }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTeamId = useSelector(selectCurrentTeamId);
  const tasksPids = tasks.map((task) => task.pid);
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
  const {
    listeners,
    setNodeRef,
    attributes,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: column.pid,
    data: {
      type: "Column",
      column,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging)
    return (
      <div
        className="h-96 p-2 rounded-md border-1 border-red-500 opacity-40 flex flex-col gap-2 w-64 bg-first"
        style={style}
        ref={setNodeRef}
      >
        <div className="flex gap-2 justify-between items-center">
          <ColumnTitleInput column={column} />
          <Button onClick={onCreateNewTask}>Add Task</Button>
        </div>
        <div className="flex flex-col gap-2 overflow-auto">
          <SortableContext items={tasksPids}>
            {tasks.map((task) => (
              <TaskCard task={task} key={task.pid} />
            ))}
          </SortableContext>
        </div>
        <div className="flex justify-between gap-2 mt-auto">
          <Button onClick={onDeleteColumn} className="mt-auto">
            Delete column
          </Button>
          <span
            className={buttonVariants({ variant: "default" })}
            {...attributes}
            {...listeners}
          >
            <MoveIcon />
          </span>
        </div>
      </div>
    );
  return (
    <div
      className="h-96 p-2 rounded-md flex flex-col gap-2 w-64 bg-first"
      style={style}
      ref={setNodeRef}
    >
      <div className="flex gap-2 justify-between items-center">
        <ColumnTitleInput column={column} />
        <Button onClick={onCreateNewTask}>Add Task</Button>
      </div>
      <div className="flex flex-col gap-2 overflow-auto">
        <SortableContext items={tasksPids}>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.pid} />
          ))}
        </SortableContext>
      </div>
      <div className="flex justify-between gap-2 mt-auto">
        <Button onClick={onDeleteColumn} className="mt-auto">
          Delete column
        </Button>
        <span
          className={buttonVariants({ variant: "default" })}
          {...attributes}
          {...listeners}
        >
          <MoveIcon />
        </span>
      </div>
    </div>
  );
};
export default Column;
