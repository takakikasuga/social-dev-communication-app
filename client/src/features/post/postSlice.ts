import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Dispatch
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { v4 } from 'uuid';
import {
  getAllPosts,
  addLikePost,
  removeLikePost,
  deletePost,
  addPost,
  getPost,
  addComment,
  deleteComment
} from './postAPI';
import { setAlert, removeAlertAsync } from '../alert/alertSlice';

export interface GetPostState {
  _id: string;
  text: string;
  name: string;
  avatar: string;
  user: string;
  likes: { _id: string; user: string }[] | [];
  comments:
    | {
        _id: string;
        user: string;
        text: string;
        name: string;
        avatar: string;
        date: Date;
      }[]
    | [];
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

interface AddLikeOrUnlikeResponse {
  _id: string;
  user: string;
}

export const addLikeAsync = createAsyncThunk<
  { postId: string; likes: AddLikeOrUnlikeResponse[] | [] },
  string,
  ThunkConfig
>('post/addLikePost', async (postId, { dispatch, rejectWithValue }) => {
  try {
    const response = await addLikePost(postId);
    console.log('addLikeAsync/response', response);
    return { postId, likes: response.data };
  } catch (err: any) {
    const response = err.response;
    console.log('rejectWithValue/response', response);
    const id = v4();
    dispatch(setAlert({ message: response.data.msg, alertType: 'danger', id }));
    dispatch(removeAlertAsync({ id, timeout: 3000 }));
    return rejectWithValue({
      status: response.status,
      message: response.data.msg
    });
  }
});

export const removeLikeAsync = createAsyncThunk<
  { postId: string; likes: AddLikeOrUnlikeResponse[] | [] },
  string,
  ThunkConfig
>('post/removeLikePost', async (postId, { dispatch, rejectWithValue }) => {
  try {
    const response = await removeLikePost(postId);
    console.log('removeLikeAsync/response', response);
    return { postId, likes: response.data };
  } catch (err: any) {
    const response = err.response;
    console.log('rejectWithValue/response', response);
    const id = v4();
    dispatch(setAlert({ message: response.data.msg, alertType: 'danger', id }));
    dispatch(removeAlertAsync({ id, timeout: 3000 }));
    return rejectWithValue({
      status: response.status,
      message: response.data.msg
    });
  }
});

export const deletePostAsync = createAsyncThunk<string, string, ThunkConfig>(
  'post/deletePost',
  async (postId, { dispatch, rejectWithValue }) => {
    try {
      const response = await deletePost(postId);
      console.log('deletePostAsync/response', response);
      const id = v4();
      dispatch(
        setAlert({ message: response.data.msg, alertType: 'success', id })
      );
      dispatch(removeAlertAsync({ id, timeout: 3000 }));
      return postId;
    } catch (err: any) {
      const response = err.response;
      console.log('rejectWithValue/response', response);
      const id = v4();
      dispatch(
        setAlert({ message: response.data.msg, alertType: 'danger', id })
      );
      dispatch(removeAlertAsync({ id, timeout: 3000 }));
      return rejectWithValue({
        status: response.status,
        message: response.data.msg
      });
    }
  }
);

export const addPostAsync = createAsyncThunk<
  GetPostState,
  { text: string },
  ThunkConfig
>('post/addPost', async (formData, { dispatch, rejectWithValue }) => {
  try {
    const response = await addPost(formData);
    console.log('addPostAsync/response', response);
    const id = v4();
    dispatch(setAlert({ message: 'Post Created', alertType: 'success', id }));
    dispatch(removeAlertAsync({ id, timeout: 3000 }));
    return response.data;
  } catch (err: any) {
    const response = err.response;
    console.log('rejectWithValue/response', response);
    const id = v4();
    dispatch(setAlert({ message: response.data.msg, alertType: 'danger', id }));
    dispatch(removeAlertAsync({ id, timeout: 3000 }));
    return rejectWithValue({
      status: response.status,
      message: response.data.msg
    });
  }
});

export const getPostAsync = createAsyncThunk<GetPostState, string, ThunkConfig>(
  'post/getPost',
  async (postId, { dispatch, rejectWithValue }) => {
    try {
      const response = await getPost(postId);
      console.log('getPostAsync/response', response);
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
  }
);

interface AddCommentResponse {
  _id: string;
  user: string;
  text: string;
  name: string;
  avatar: string;
  date: Date;
}
export const addCommentAsync = createAsyncThunk<
  AddCommentResponse[],
  { postId: string; formData: { text: string } },
  ThunkConfig
>(
  'post/addComment',
  async ({ postId, formData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await addComment(postId, formData);
      console.log('addPostAsync/response', response);
      const id = v4();
      dispatch(
        setAlert({ message: 'Comment Added', alertType: 'success', id })
      );
      dispatch(removeAlertAsync({ id, timeout: 3000 }));
      return response.data;
    } catch (err: any) {
      const response = err.response;
      console.log('rejectWithValue/response', response);
      const id = v4();
      dispatch(
        setAlert({ message: response.data.msg, alertType: 'danger', id })
      );
      dispatch(removeAlertAsync({ id, timeout: 3000 }));
      return rejectWithValue({
        status: response.status,
        message: response.data.msg
      });
    }
  }
);

export const deleteCommentAsync = createAsyncThunk<
  string,
  { postId: string; commentId: string },
  ThunkConfig
>(
  'post/deleteComment',
  async ({ postId, commentId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteComment(postId, commentId);
      console.log('addPostAsync/response', response);
      const id = v4();
      dispatch(
        setAlert({ message: 'Comment Deleted', alertType: 'success', id })
      );
      dispatch(removeAlertAsync({ id, timeout: 3000 }));
      return commentId;
    } catch (err: any) {
      const response = err.response;
      console.log('rejectWithValue/response', response);
      const id = v4();
      dispatch(
        setAlert({ message: response.data.msg, alertType: 'danger', id })
      );
      dispatch(removeAlertAsync({ id, timeout: 3000 }));
      return rejectWithValue({
        status: response.status,
        message: response.data.msg
      });
    }
  }
);

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
            status: 'failed',
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
      )
      .addCase(addLikeAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          loading: false
        };
      })
      .addCase(addLikeAsync.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          error: action.payload,
          status: 'failed',
          loading: false
        };
      })
      .addCase(
        addLikeAsync.fulfilled,
        (
          state,
          action: PayloadAction<{
            postId: string;
            likes: AddLikeOrUnlikeResponse[] | [];
          }>
        ) => {
          return {
            ...state,
            posts: state.posts.map((post) =>
              post._id === action.payload.postId
                ? { ...post, likes: action.payload.likes }
                : post
            ),
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(removeLikeAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          loading: false
        };
      })
      .addCase(
        removeLikeAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'failed',
            loading: false
          };
        }
      )
      .addCase(
        removeLikeAsync.fulfilled,
        (
          state,
          action: PayloadAction<{
            postId: string;
            likes: AddLikeOrUnlikeResponse[] | [];
          }>
        ) => {
          return {
            ...state,
            posts: state.posts.map((post) =>
              post._id === action.payload.postId
                ? { ...post, likes: action.payload.likes }
                : post
            ),
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(deletePostAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          loading: false
        };
      })
      .addCase(
        deletePostAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'failed',
            loading: false
          };
        }
      )
      .addCase(
        deletePostAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          return {
            ...state,
            posts: state.posts.filter((post) => post._id !== action.payload),
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(addPostAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          loading: false
        };
      })
      .addCase(addPostAsync.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          error: action.payload,
          status: 'failed',
          loading: false
        };
      })
      .addCase(
        addPostAsync.fulfilled,
        (state, action: PayloadAction<GetPostState>) => {
          return {
            ...state,
            posts: [action.payload, ...state.posts],
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(getPostAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          loading: false
        };
      })
      .addCase(getPostAsync.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          error: action.payload,
          status: 'failed',
          loading: false
        };
      })
      .addCase(
        getPostAsync.fulfilled,
        (state, action: PayloadAction<GetPostState>) => {
          return {
            ...state,
            post: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(addCommentAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          loading: false
        };
      })
      .addCase(
        addCommentAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'failed',
            loading: false
          };
        }
      )
      .addCase(
        addCommentAsync.fulfilled,
        (state, action: PayloadAction<AddCommentResponse[]>) => {
          return {
            ...state,
            post: { ...state.post!, comments: action.payload },
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(deleteCommentAsync.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          loading: false
        };
      })
      .addCase(
        deleteCommentAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'failed',
            loading: false
          };
        }
      )
      .addCase(
        deleteCommentAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            post: {
              ...state.post!,
              comments: state.post!.comments.filter(
                (comment) => comment._id !== action.payload
              )
            },
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
