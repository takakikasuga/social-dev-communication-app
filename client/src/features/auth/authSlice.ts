import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Dispatch
} from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { RootState } from '../../app/store';

// API
import {
  registerAuthentication,
  loadAuthentication,
  loginAuthentication
} from './authAPI';

// スライス
import { setAlert, removeAlertAsync } from '../alert/alertSlice';

// ユーティリティ
import { setAuthToken } from '../../utils/index';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user?: {
    name: string;
    email: string;
    avatar: string;
    _id: string;
  };
  msg?: string;
  status: 'success' | 'loading' | 'failed';
  errorCode?: number;
}

interface ThunkConfig {
  state?: RootState;
  dispatch?: Dispatch;
  rejectWithValue?: {
    status: number;
    message: string;
  };
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  status: 'loading'
};

export const loadUserAsync = createAsyncThunk<
  { name: string; email: string; avatar: string; _id: string },
  {},
  ThunkConfig
>('load/loadAuthentication', async ({}, { rejectWithValue }) => {
  console.log('loadAuthentication');
  console.log('localStorage.token', localStorage.token);
  if (localStorage.token) {
    // tokenをheadersにセットする
    setAuthToken(localStorage.token);
  }
  try {
    const response = await loadAuthentication();
    console.log('response', response);
    return response.data;
  } catch (err: any) {
    const response = err.response;
    return rejectWithValue({
      status: response.status,
      message: err.message
    });
  }
});

export const registerUserAsync = createAsyncThunk<
  { token: string; msg: string },
  { name: string; password: string; email: string },
  ThunkConfig
>(
  'register/registerAuthentication',
  async ({ name, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await registerAuthentication(name, email, password);
      localStorage.setItem('token', response.data.token);
      // dispatch(loadUserAsync({}))を行う前にセットする
      console.log('response', response);
      dispatch(loadUserAsync({}));
      return response.data;
    } catch (err: any) {
      console.log('エラーが起きています。');
      console.log('err.message', err.message);
      const response = err.response;
      console.log('err.response', response);
      const errors = response.data.errors as { msg: string }[];
      if (errors) {
        const id = v4();
        errors.forEach((error: { msg: string }) => {
          console.log(' error.msg', error.msg);
          dispatch(setAlert({ message: error.msg, alertType: 'danger', id }));
          dispatch(removeAlertAsync({ id, timeout: 3000 }));
        });
      }
      return rejectWithValue({
        status: response.status,
        message: err.message
      });
    }
  }
);

export const loginUserAsync = createAsyncThunk<
  any,
  { email: string; password: string },
  ThunkConfig
>(
  'login/loginAuthentication',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    console.log('localStorage.token', localStorage.token);
    try {
      const response = await loginAuthentication(email, password);
      // dispatch(loadUserAsync({}))を行う前にセットする
      localStorage.setItem('token', response.data.token);
      dispatch(loadUserAsync({}));
      console.log('response', response);
      return response.data;
    } catch (err: any) {
      console.log('エラーが起きています。');
      console.log('err.message', err.message);
      const response = err.response;
      console.log('err.response', response);
      const errors = response.data.errors as { msg: string }[];
      if (errors) {
        const id = v4();
        errors.forEach((error: { msg: string }) => {
          console.log(' error.msg', error.msg);
          dispatch(setAlert({ message: error.msg, alertType: 'danger', id }));
          dispatch(removeAlertAsync({ id, timeout: 3000 }));
        });
      }
      return rejectWithValue({
        status: response.status,
        message: err.message
      });
    }
  }
);

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    increment: (state) => {
      return state;
    },
    decrement: (state) => {
      return state;
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      return state;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUserAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(loadUserAsync.rejected, (state) => {
        console.log('loadUserAsync.rejected');
        localStorage.removeItem('token');
        if (state.user) {
          delete state.user;
        }
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          status: 'failed'
        };
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(registerUserAsync.rejected, (state) => {
        console.log('registerUserAsync.rejected');
        localStorage.removeItem('token');
        if (state.user) {
          delete state.user;
        }
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          status: 'failed'
        };
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: 'success',
          isAuthenticated: true
        };
      })

      .addCase(loadUserAsync.fulfilled, (state, action) => {
        return {
          ...state,
          // 読み込み時にトークンが存在する場合
          token: localStorage.token,
          status: 'success',
          isAuthenticated: true,
          user: action.payload
        };
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        console.log('loginUserAsync.rejected');
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          status: 'failed'
        };
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: 'success',
          isAuthenticated: true
        };
      });
  }
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;

export const authStatus = (state: RootState) => state.auth;

export default authSlice.reducer;
