import type { RootState } from "@/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TeamMessageInterface {
  id: string;
  message: string;
  senderId: string;
  senderUsername: string;
  createdAt: string;
}

interface currentTeamMessagesState {
  messages: TeamMessageInterface[];
  currentTeamId: string;
  messagesLeft: number;
}

const initialState: currentTeamMessagesState = {
  messages: [],
  currentTeamId: "",
  messagesLeft: 0,
};

export const currentTeamMessagesSlice = createSlice({
  initialState,
  name: "currentTeamMessages",
  reducers: {
    setInitialMessages: (
      state,
      action: PayloadAction<{
        messages: TeamMessageInterface[];
        teamId: string;
        messagesLeft: number;
      }>
    ) => {
      state.messages = action.payload.messages;
      state.currentTeamId = action.payload.teamId;
      state.messagesLeft = action.payload.messagesLeft;
    },
    setMessagesLeft: (state, action: PayloadAction<number>) => {
      state.messagesLeft = action.payload;
    },
    addOldMessages: (state, action: PayloadAction<TeamMessageInterface[]>) => {
      state.messages = [...state.messages, ...action.payload];
    },
    addNewMessage: (state, action: PayloadAction<TeamMessageInterface>) => {
      state.messages = [action.payload, ...state.messages];
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      );
    },
  },
});

export const selectTeamMessagesAllMessages = (state: RootState) =>
  state.currentTeamMessages.messages;
export const selectCurrentTeamId = (state: RootState) =>
  state.currentTeamMessages.currentTeamId;
export const selectMessagesLeft = (state: RootState) =>
  state.currentTeamMessages.messagesLeft;
export const {
  addOldMessages,
  setInitialMessages,
  deleteMessage,
  addNewMessage,
  setMessagesLeft,
} = currentTeamMessagesSlice.actions;
export default currentTeamMessagesSlice.reducer;
