import type { RootState } from "@/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

export const selectTeamTasksColumns = (state: RootState) =>
  state.currentTeamTasks.columns;
export const selectTeamTasksTasks = (state: RootState) =>
  state.currentTeamTasks.tasks;

export const {
  addNewColumn,
  deleteColumn,
  setInitialTasks,
  addNewTask,
  deleteTask,
} = currentTeamTasksSlice.actions;
export default currentTeamTasksSlice.reducer;
