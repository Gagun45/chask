import type { RootState } from "@/redux/store";
import { getTeamWithMessagesByPid } from "@/utils/actions/team.actions";
import type { StatusType, teamWithMessages } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface currentTeamState {
  team: teamWithMessages | null;
  status: StatusType;
}

const initialState: currentTeamState = {
  team: null,
  status: "idle",
};

export const fetchCurrentTeam = createAsyncThunk(
  "currentTeam",
  async (teamPid: string) => {
    const team = await getTeamWithMessagesByPid(teamPid);
    return team;
  }
);

export const currentTeamSlice = createSlice({
  initialState,
  name: "currentTeam",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.team = action.payload;
      })
      .addCase(fetchCurrentTeam.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectCurrentTeam = (state: RootState) => state.currentTeam.team;

export default currentTeamSlice.reducer;
