import type { RootState } from "@/redux/store";
import { getMyTeams } from "@/utils/actions/team.get.actions";
import type { StatusType } from "@/utils/types";
import type { Team } from "@prisma/client";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface MyTeamsState {
  teams: Team[];
  status: StatusType;
}

const initialState: MyTeamsState = {
  teams: [],
  status: "idle",
};

export const fetchMyTeams = createAsyncThunk("myTeams/fetch", async () => {
  const teams = await getMyTeams();
  const serTeams = teams.map((team) => ({
    ...team,
    creator: {
      ...team.creator,
      emailVerified: team.creator.emailVerified?.toISOString() ?? null,
    },
  }));
  return serTeams;
});

export const myTeamsSlice = createSlice({
  name: "myTeams",
  initialState,
  reducers: {
    leaveTeam: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
    },
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

export const { clearTeams, leaveTeam } = myTeamsSlice.actions;

export default myTeamsSlice.reducer;
