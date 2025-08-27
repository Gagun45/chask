import {
  selectTeamTasksColumns,
  selectTeamTasksTasks,
  setColumns,
  setTasks,
  type TeamTaskColumn,
  type TeamTaskSingle,
} from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import Column from "../Column/Column";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { AppDispatch } from "@/redux/store";
import TaskCard from "../Column/TaskCard/TaskCard";
import { useDebouncedCallback } from "use-debounce";

type OverStateType = {
  type: "Task" | "Column";
  pid: number;
};

const DNDContext = () => {
  const columns = useSelector(selectTeamTasksColumns);
  const columnsIds = columns.map((col) => col.pid);
  const tasks = useSelector(selectTeamTasksTasks);
  const dispatch = useDispatch<AppDispatch>();

  const [activeCol, setActiveCol] = useState<TeamTaskColumn | null>(null);
  const [activeTask, setActiveTask] = useState<TeamTaskSingle | null>(null);
  const [overState, setOverState] = useState<OverStateType | null>(null);

  const debouncedSetOverState = useDebouncedCallback(
    (pid: number, type: "Task" | "Column") => {
      if (!pid) return;
      setOverState({ pid, type });
    },
    100
  );

  useEffect(() => {
    console.log(overState);
    const isActiveATask = !!activeTask;
    const isActiveAColumn = !!activeCol;
    const isOverATask = overState?.type === "Task";

    const activeId = activeTask?.pid;
    const overId = overState?.pid;
    if (activeId === overId) return;
    if (isActiveAColumn) {
      const activeIndex = columns.findIndex((col) => col.pid === activeCol.pid);
      const overIndex = columns.findIndex((col) => col.pid === overState?.pid);
      dispatch(
        setColumns({ columns: arrayMove(columns, activeIndex, overIndex) })
      );
    }
    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex((task) => task.pid === activeId);
      const overIndex = tasks.findIndex((task) => task.pid === overId);
      const updatedTasks: TeamTaskSingle[] = tasks.map((t, i) =>
        i === activeIndex
          ? { ...t, teamColumnPid: tasks[overIndex].teamColumnPid }
          : t
      );
      dispatch(
        setTasks({ tasks: arrayMove(updatedTasks, activeIndex, overIndex) })
      );
    }
    if (isActiveATask && !isOverATask) {
      const activeIndex = tasks.findIndex((task) => task.pid === activeId);
      const newColumnPid = columns.find((col) => col.pid === overId)?.pid;
      const updatedTasks: TeamTaskSingle[] = tasks.map((t, i) =>
        i === activeIndex ? { ...t, teamColumnPid: newColumnPid! } : t
      );
      dispatch(
        setTasks({ tasks: arrayMove(updatedTasks, activeIndex, activeIndex) })
      );
    }
  }, [overState?.pid]);
  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column")
      setActiveCol(e.active.data.current?.column);
    if (e.active.data.current?.type === "Task")
      setActiveTask(e.active.data.current?.task);
  };
  const onDragEnd = (e: DragEndEvent) => {
    setActiveCol(null);
    setActiveTask(null);
  };
  const onDragOver = (e: DragOverEvent) => {
    const { over } = e;
    if (!over) return;
    if (over.id !== overState?.pid)
      debouncedSetOverState(
        parseInt(over.id.toString()),
        over.data.current?.type
      );
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex flex-wrap overflow-auto h-full gap-2">
        <SortableContext items={columnsIds}>
          {columns.map((col) => (
            <Column
              key={col.pid}
              column={col}
              tasks={tasks.filter((task) => task.teamColumnPid === col.pid)}
            />
          ))}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeCol && (
              <Column
                column={activeCol}
                tasks={tasks.filter(
                  (task) => task.teamColumnPid === activeCol.pid
                )}
              />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </div>
    </DndContext>
  );
};
export default DNDContext;
