import { Input } from "@/components/ui/input";
import {
  updateColumn,
  type TeamTaskColumn,
} from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import type { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  column: TeamTaskColumn;
}

const ColumnTitleInput = ({ column }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(column.title);
  const editColumn = () => {
    if (!title) {
      setTitle(column.title);
      return;
    }
    dispatch(updateColumn({ pid: column.pid, title }));
  };
  if (editMode) {
    return (
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => {
          setTitle(column.title);
          setEditMode(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            editColumn();
            setEditMode(false);
          }
          if (e.key === "Escape") {
            setTitle(column.title);
            setEditMode(false);
          }
        }}
      />
    );
  }
  return <span className="line-clamp-2" onClick={() => setEditMode((prev) => !prev)}>{column.title}</span>;
};
export default ColumnTitleInput;
