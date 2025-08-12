import type { RootState } from "@/redux/store";
import { getMyTeams } from "@/utils/actions/team.actions";
import type { Team } from "@prisma/client";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type StatusType = "idle" | "loading" | "succeeded" | "failed";

interface MyTeamsState {
  teams: Team[];
  status: StatusType;
}

const initialState: MyTeamsState = {
  teams: [],
  status: "idle",
};

export const fetchMyTeams = createAsyncThunk("myTeams/fetch", async () => {
  return await getMyTeams();
});

export const myTeamsSlice = createSlice({
  name: "myTeams",
  initialState,
  reducers: {
    clearTeams: (state) => {
      state.teams = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMyTeams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyTeams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = action.payload;
      })
      .addCase(fetchMyTeams.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectMyTeamsAll = (state: RootState) => state.myTeams.teams;
export const selectMyTeamsStatus = (state: RootState) => state.myTeams.status;

export const { clearTeams } = myTeamsSlice.actions;

export default myTeamsSlice.reducer;
