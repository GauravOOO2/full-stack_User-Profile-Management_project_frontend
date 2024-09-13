import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

// Types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
