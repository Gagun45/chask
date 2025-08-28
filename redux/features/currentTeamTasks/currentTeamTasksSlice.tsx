import type { RootState } from "@/redux/store";
import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface TeamTaskSingle {
  pid: number;
  content: string;
  teamColumnPid: number;
  teamId: string;
}
export interface TeamTaskColumn {
  pid: number;
  title: string;
  teamId: string;
}

export interface currentTeamTasksState {
  columns: TeamTaskColumn[];
  tasks: TeamTaskSingle[];
}
const initialState: currentTeamTasksState = {
  columns: [],
  tasks: [],
};

export const currentTeamTasksSlice = createSlice({
  initialState,
  name: "currentTeamTasks",
  reducers: {
    setInitialTasks: (
      state,
      action: PayloadAction<{
        columns: TeamTaskColumn[];
        tasks: TeamTaskSingle[];
      }>
    ) => {
      state.columns = action.payload.columns;
      state.tasks = action.payload.tasks;
    },
    setColumns: (
      state,
      action: PayloadAction<{ columns: TeamTaskColumn[] }>
    ) => {
      state.columns = action.payload.columns;
    },
    setTasks: (state, action: PayloadAction<{ tasks: TeamTaskSingle[] }>) => {
      state.tasks = action.payload.tasks;
    },
    updateColumn: (
      state,
      action: PayloadAction<{ pid: number; title: string }>
    ) => {
      const title = action.payload.title;
      state.columns = state.columns.map((col) =>
        col.pid === action.payload.pid ? { ...col, title } : col
      );
    },
    updateTask: (
      state,
      action: PayloadAction<{ pid: number; content: string }>
    ) => {
      const content = action.payload.content;
      state.tasks = state.tasks.map((task) =>
        task.pid === action.payload.pid ? { ...task, content } : task
      );
    },
    addNewColumn: (state, action: PayloadAction<TeamTaskColumn>) => {
      state.columns.push(action.payload);
    },
    deleteColumn: (state, action: PayloadAction<{ columnPid: number }>) => {
      state.columns = state.columns.filter(
        (col) => col.pid !== action.payload.columnPid
      );
      state.tasks = state.tasks.filter(
        (task) => task.teamColumnPid !== action.payload.columnPid
      );
    },
    addNewTask: (state, action: PayloadAction<{ task: TeamTaskSingle }>) => {
      state.tasks.push(action.payload.task);
    },
    deleteTask: (state, action: PayloadAction<{ taskPid: number }>) => {
      state.tasks = state.tasks.filter(
        (task) => task.pid !== action.payload.taskPid
      );
    },
  },
});

export const selectTeamTasksColumns = createSelector(
  (state: RootState) => state.currentTeamTasks.columns,
  (columns) => columns
);

export const selectTeamTasksTasks = createSelector(
  (state: RootState) => state.currentTeamTasks.tasks,
  (tasks) => tasks
);

export const {
  addNewColumn,
  deleteColumn,
  setInitialTasks,
  addNewTask,
  deleteTask,
  setColumns,
  setTasks,
  updateColumn,
  updateTask,
} = currentTeamTasksSlice.actions;
export default currentTeamTasksSlice.reducer;
