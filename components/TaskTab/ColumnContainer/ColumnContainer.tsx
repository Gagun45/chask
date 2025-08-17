import { Button } from "@/components/ui/button";
import type { Column, Task } from "../TaskTab";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard/TaskCard";

interface Props {
  column: Column;
  onDeleteTask: (id: number) => void;
  onDeleteColumn: (id: number) => void;
  onUpdateColumn: (id: number, title: string) => void;
  onCreateTask: (id: number) => void;
  tasks: Task[];
}

const ColumnContainer = ({
  column,
  onDeleteTask,
  onDeleteColumn,
  onUpdateColumn,
  onCreateTask,
  tasks,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging)
    return (
      <div
        className="flex flex-col bg-blue-400 h-full w-48 border-2 opacity-50 border-red-400"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="flex justify-between">
          <h2>{column.title}</h2>
          <Button onClick={() => onDeleteColumn(column.id)}>Delete</Button>
        </div>
        <div>Content</div>
        <div className="mt-auto">Footer</div>
      </div>
    );

  return (
    <div
      className="flex flex-col bg-blue-400 h-full w-48"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between">
        <div onClick={() => setEditMode(true)} className="w-24">
          {!editMode && column.title}
          {editMode && (
            <input
              className="border-1 w-full"
              value={column.title}
              onChange={(e) => onUpdateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <Button onClick={() => onDeleteColumn(column.id)}>Delete</Button>
      </div>
      <div className="flex flex-col gap-2">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} onDeleteTask={onDeleteTask} />
          ))}
        </SortableContext>
      </div>
      <div className="mt-auto">
        <Button onClick={() => onCreateTask(column.id)}>Create Task</Button>
      </div>
    </div>
  );
};
export default ColumnContainer;
