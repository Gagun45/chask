import {
  selectTeamTasksColumns,
  selectTeamTasksTasks,
  setColumns,
  type TeamTaskColumn,
} from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import Column from "../Column/Column";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { AppDispatch } from "@/redux/store";

const DNDContext = () => {
  const columns = useSelector(selectTeamTasksColumns);
  const columnsIds = columns.map((col) => col.pid);
  const tasks = useSelector(selectTeamTasksTasks);
  const dispatch = useDispatch<AppDispatch>();

  const [activeCol, setActiveCol] = useState<TeamTaskColumn | null>(null);
  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column")
      setActiveCol(e.active.data.current?.column);
  };
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const activeId = parseInt(active.id.toString());
    const overId = parseInt(over.id.toString());
    if (activeId === overId) return;
    const activeIndex = columns.findIndex((col) => col.pid === activeId);
    const overIndex = columns.findIndex((col) => col.pid === overId);
    dispatch(
      setColumns({ columns: arrayMove(columns, activeIndex, overIndex) })
    );
  };
  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex bg-green-300 h-full gap-2">
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
          </DragOverlay>,
          document.body
        )}
      </div>
    </DndContext>
  );
};
export default DNDContext;
