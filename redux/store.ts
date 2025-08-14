import { configureStore } from "@reduxjs/toolkit";
import myTeamsReducer from "./features/myTeams/myTeamsSlice";
import currentTeamReducer from "./features/currentTeamMessages/currentTeamMessagesSlice";

export const store = configureStore({
  reducer: {
    myTeams: myTeamsReducer,
    currentTeamMessages: currentTeamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
