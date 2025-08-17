"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import ColumnContainer from "./ColumnContainer/ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./ColumnContainer/TaskCard/TaskCard";

type Id = number;
export type Column = {
  id: Id;
  title: string;
};
export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

const TaskTab = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [tasks, setTasks] = useState<Task[]>([]);
  const columnIds = useMemo(() => {
    return columns.map((col) => col.id);
  }, [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const generateId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const createTask = (columnId: number) => {
    const columnTasksLength = tasks.filter(
      (task) => task.columnId === columnId
    ).length;
    const newTask: Task = {
      columnId,
      id: generateId(),
      content: `Task ${columnTasksLength + 1}`,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const addNewColumn = () => {
    const id = generateId();
    const title = `Column ${columns.length + 1}`;
    const newColumn: Column = { id, title };
    setColumns((prev) => [...prev, newColumn]);
  };

  const updateColumn = (id: number, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  };

  const deleteColumn = (columnId: number) => {
    setColumns((prev) => prev.filter((col) => col.id !== columnId));
  };

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
    }
    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = e;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    setColumns((prev) => {
      const activeIndex = prev.findIndex((col) => col.id === activeId);
      const overIndex = prev.findIndex((col) => col.id === overId);
      return arrayMove(prev, activeIndex, overIndex);
    });
  };

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;
    // drop a task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }
    // drop a task over a column
    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = parseInt(overId.toString());

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };
  if (!isMounted) return <></>;

  return (
    <div className="bg-red-200 size-full flex flex-col">
      <Button
        onClick={() => {
          addNewColumn();
        }}
      >
        Add Column
      </Button>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className="flex gap-4 size-full">
          <SortableContext items={columnIds}>
            {columns.map((column) => (
              <ColumnContainer
                onDeleteColumn={deleteColumn}
                onUpdateColumn={updateColumn}
                onCreateTask={createTask}
                onDeleteTask={deleteTask}
                column={column}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                key={column.id}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                onDeleteColumn={deleteColumn}
                onUpdateColumn={updateColumn}
                onDeleteTask={deleteTask}
                onCreateTask={createTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
                column={activeColumn}
              />
            )}
            {activeTask && (
              <TaskCard task={activeTask} onDeleteTask={deleteTask} />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
export default TaskTab;
