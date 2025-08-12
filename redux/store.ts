import { configureStore } from "@reduxjs/toolkit";
import myTeamsReducer from "./features/myTeams/myTeamsSlice";

export const store = configureStore({
  reducer: {
    myTeams: myTeamsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
