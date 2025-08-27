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
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ColumnTitleInput from "./ColumnTitleInput";

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
        className="h-full flex flex-col w-42 bg-blue-300 border-1 border-red-500 opacity-30"
        style={style}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
      >
        <div className="flex justify-between">
          <span>{column.title}</span>
          <Button onClick={onCreateNewTask}>New</Button>
        </div>
        <div className="flex flex-col gap-2">
          <SortableContext items={tasksPids}>
            {tasks.map((task) => (
              <TaskCard task={task} key={task.pid} />
            ))}
          </SortableContext>
        </div>
        <Button onClick={onDeleteColumn} className="mt-auto">
          Delete column
        </Button>
      </div>
    );
  return (
    <div
      className="h-96 p-2 rounded-md flex flex-col w-64 bg-blue-300"
      style={style}
      ref={setNodeRef}
    >
      <div className="flex justify-between items-center">
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
      <div {...attributes} {...listeners}>
        MOVE
      </div>
      <Button onClick={onDeleteColumn} className="mt-auto">
        Delete column
      </Button>
    </div>
  );
};
export default Column;
