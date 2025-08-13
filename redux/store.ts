import { configureStore } from "@reduxjs/toolkit";
import myTeamsReducer from "./features/myTeams/myTeamsSlice";
import currentTeamReducer from "./features/currentTeam/currentTeamSlice";

export const store = configureStore({
  reducer: {
    myTeams: myTeamsReducer,
    currentTeam: currentTeamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
