// client/src/store/remindersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const remindersSlice = createSlice({
  name: 'reminders',
  initialState: {
    items: [],
  },
  reducers: {
    addReminder: (state, action) => {
      state.items.push(action.payload);
    },
    removeReminder: (state, action) => {
      state.items = state.items.filter(
        (reminder) => reminder.id !== action.payload
      );
    },
    reorderReminders: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.items.splice(sourceIndex, 1);
      state.items.splice(destinationIndex, 0, removed);
    },
    // 其他reducer
  },
});

export const { addReminder, removeReminder, reorderReminders } =
  remindersSlice.actions;
export default remindersSlice.reducer;
