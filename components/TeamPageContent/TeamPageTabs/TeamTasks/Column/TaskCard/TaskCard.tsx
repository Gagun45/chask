import { Button, buttonVariants } from "@/components/ui/button";
import {
  deleteTask,
  updateTask,
  type TeamTaskSingle,
} from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import type { AppDispatch } from "@/redux/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EditIcon, MoveIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  task: TeamTaskSingle;
}

const TaskCard = ({ task }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState(task.content);
  const [editMode, setEditMode] = useState(false);
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
  } = useSortable({
    id: task.pid,
    data: { type: "Task", task },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const editTaskContent = () => {
    if (!content) {
      setContent(task.content);
      return;
    }
    dispatch(updateTask({ pid: task.pid, content }));
  };

  if (isDragging)
    return (
      <div
        className="w-full p-1 h-fit border-1 border-red-500 opacity-40 flex items-start bg-second rounded-md"
        style={style}
        ref={setNodeRef}
      >
        <div className="flex size-full">
          {editMode ? (
            <textarea
              className="break-words h-full"
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={() => {
                setContent(task.content);
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setContent(task.content);
                  setEditMode(false);
                }
                if (e.key === "Enter") {
                  editTaskContent();
                  setEditMode(false);
                }
              }}
            />
          ) : (
            <span>{task.content}</span>
          )}
        </div>
        <div className="flex ml-auto items-end flex-col gap-1 w-1/4">
          <Button className="bg-destructive size-7" onClick={onDeleteTask}>
            <TrashIcon />
          </Button>
          <Button
            className="size-7"
            onClick={() => setEditMode((prev) => !prev)}
          >
            <EditIcon />
          </Button>
          <span
            className={`${buttonVariants({ variant: "default" })} !size-7`}
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
      className="w-full p-1 h-fit flex items-start bg-second rounded-md"
      style={style}
      ref={setNodeRef}
    >
      <div className="flex size-full">
        {editMode ? (
          <textarea
            className="break-words h-full"
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => {
              setContent(task.content);
              setEditMode(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setContent(task.content);
                setEditMode(false);
              }
              if (e.key === "Enter") {
                editTaskContent();
                setEditMode(false);
              }
            }}
          />
        ) : (
          <span>{task.content}</span>
        )}
      </div>
      <div className="flex ml-auto items-end flex-col gap-1 w-1/4">
        <Button className="bg-destructive size-7" onClick={onDeleteTask}>
          <TrashIcon />
        </Button>
        <Button className="size-7" onClick={() => setEditMode((prev) => !prev)}>
          <EditIcon />
        </Button>
        <span
          className={`${buttonVariants({ variant: "default" })} !size-7`}
          {...attributes}
          {...listeners}
        >
          <MoveIcon />
        </span>
      </div>
    </div>
  );
};
export default TaskCard;
