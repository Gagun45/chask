import type { RootState } from "@/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TeamMessageInterface {
  id: string;
  message: string;
  senderId: string;
  senderUsername: string;
}

interface currentTeamMessagesState {
  messages: TeamMessageInterface[];
}

const initialState: currentTeamMessagesState = {
  messages: [],
};

export const currentTeamMessagesSlice = createSlice({
  initialState,
  name: "currentTeamMessages",
  reducers: {
    setInitialMessages: (
      state,
      action: PayloadAction<TeamMessageInterface[]>
    ) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<TeamMessageInterface>) => {
      state.messages.push(action.payload);
    },
  },
});

export const selectTeamMessagesAllMessages = (state: RootState) =>
  state.currentTeamMessages.messages;

export const { addMessage, setInitialMessages } =
  currentTeamMessagesSlice.actions;
export default currentTeamMessagesSlice.reducer;
