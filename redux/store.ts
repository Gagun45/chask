import { configureStore } from "@reduxjs/toolkit";
import myTeamsReducer from "./features/myTeams/myTeamsSlice";
import currentTeamMessagesReducer from "./features/currentTeamMessages/currentTeamMessagesSlice";
import currentTeamTasksReducer from "./features/currentTeamTasks/currentTeamTasksSlice";

export const store = configureStore({
  reducer: {
    myTeams: myTeamsReducer,
    currentTeamMessages: currentTeamMessagesReducer,
    currentTeamTasks: currentTeamTasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
