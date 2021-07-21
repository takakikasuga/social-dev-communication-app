import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Dispatch
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { v4 } from 'uuid';
import { getAllPosts } from './postAPI';
import { setAlert, removeAlertAsync } from '../alert/alertSlice';

export interface GetPostState {
  _id: string;
  text: string;
  name: string;
  avatar: string;
  user: string;
  likes: any[];
  comments: any[];
  date: Date;
  __v?: string;
}

export interface PostState {
  posts: GetPostState[];
  post: GetPostState | null;
  loading: boolean;
  error?: {
    status: number;
    message: string;
  };
  status: 'success' | 'loading' | 'failed';
}

const initialState: PostState = {
  posts: [],
  post: null,
  loading: true,
  status: 'success'
};

interface ThunkConfig {
  state?: RootState;
  dispatch?: Dispatch;
  rejectWithValue: {
    status: number;
    message: string;
  };
}

export const getAllPostsAsync = createAsyncThunk<
  GetPostState[],
  {},
  ThunkConfig
>('post/getAllPosts', async ({}, { dispatch, rejectWithValue }) => {
  try {
    const response = await getAllPosts();
    console.log('getPostsAsync/response', response);
    return response.data;
  } catch (err: any) {
    const response = err.response;
    console.log('rejectWithValue/response', response);
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
      message: response.data.msg
    });
  }
});

export const postSlice = createSlice({
  name: 'post',
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
      .addCase(getAllPostsAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          loading: false
        };
      })
      .addCase(
        getAllPostsAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(
        getAllPostsAsync.fulfilled,
        (state, action: PayloadAction<GetPostState[]>) => {
          return {
            ...state,
            posts: action.payload,
            status: 'success',
            loading: false
          };
        }
      );
  }
});

export const { increment, decrement, incrementByAmount } = postSlice.actions;

export const postStatus = (state: RootState) => state.post;

export default postSlice.reducer;
