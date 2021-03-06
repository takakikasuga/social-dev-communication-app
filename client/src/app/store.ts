import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import alertReducer from '../features/alert/alertSlice';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import postReducer from '../features/post/postSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
