import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { removeAlertAPI } from './alertAPI';

export interface AlertStatus {
  alertType: string;
  id: string;
  message: string;
}

interface AlertState {
  alertStatus: AlertStatus[];
  status: 'success' | 'loading' | 'failed';
}

const initialState: AlertState = {
  alertStatus: [],
  status: 'loading'
};

export const removeAlertAsync = createAsyncThunk<
  string,
  { id: string; timeout?: number },
  any
>('alert/removeAlert', async ({ id, timeout = 5000 }) => {
  const response = await removeAlertAPI(id, timeout);
  return response.id;
});

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      console.log('発火しています。');
      state.status = 'success';
      state.alertStatus.push(action.payload);
      return state;
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeAlertAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(removeAlertAsync.fulfilled, (state, action) => {
        state.status = 'success';
        const filterAlertStatus = state.alertStatus.filter((alert) => {
          return alert.id !== action.payload;
        });
        state.alertStatus = filterAlertStatus;
        return state;
      });
  }
});

export const { setAlert, incrementByAmount } = alertSlice.actions;

export const raiseAlertState = (state: RootState) => state.alert.alertStatus;

export default alertSlice.reducer;
