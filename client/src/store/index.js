// client/src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import remindersReducer from './remindersSlice';

const store = configureStore({
  reducer: {
    reminders: remindersReducer,
  },
});

export default store;
