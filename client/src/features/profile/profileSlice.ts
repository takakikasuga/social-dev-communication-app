import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Dispatch
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import * as H from 'history';
import { v4 } from 'uuid';

import { getCurrentProfile, createOrUpdateProfile } from './profileAPI';

import { setAlert, removeAlertAsync } from '../alert/alertSlice';
import { CreateProfileValue } from '../../components/profile-form/CreateProfile';

interface ProfileData {
  _id: string;
  skills: string[];
  status: string;
  date: string;
  __v: number;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  experience?: {
    _id: string;
    title: string;
    company: string;
    location: string;
    from: string;
    description: string;
    current?: boolean;
  }[];
  education?: {
    _id: string;
    school: string;
    degree: string;
    fieldofstudy: string;
    from: string;
    to?: string;
    description: string;
    current?: boolean;
  }[];
  bio?: string;
  location?: string;
  company?: string;
  website?: string;
  githubusername?: string;
  social?: {
    youtube?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface ProfileState {
  profile: ProfileData | null;
  profiles: any;
  repos: any;
  loading: boolean;
  error?: {
    status: number;
    message: string;
  };
  status: 'success' | 'loading' | 'failed';
}

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  status: 'loading'
};

interface ThunkConfig {
  state?: RootState;
  dispatch?: Dispatch;
  rejectWithValue: {
    status: number;
    message: string;
  };
}

export const getCurrentProfileAsync = createAsyncThunk<
  ProfileData,
  {},
  ThunkConfig
>('profile/getCurrentProfile', async ({}, { rejectWithValue }) => {
  try {
    const response = await getCurrentProfile();
    console.log('getCurrentProfileAsync/response', response);

    return response.data;
  } catch (err: any) {
    const response = err.response;
    console.log('rejectWithValue/response', response);

    return rejectWithValue({
      status: response.status,
      message: response.data.msg
    });
  }
});

export const createOrUpdateProfileAsync = createAsyncThunk<
  ProfileData,
  { formData: CreateProfileValue; history: H.History; edit: boolean },
  ThunkConfig
>(
  'profile/createOrUpdateProfile',
  async (
    { formData, history, edit = false },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await createOrUpdateProfile(formData);
      console.log('createOrUpdateProfileAsync/response', response);
      const id = v4();
      dispatch(
        setAlert({
          message: edit ? 'Profile Updatetd' : 'Profile Created',
          alertType: 'success',
          id
        })
      );
      dispatch(removeAlertAsync({ id, timeout: 5000 }));

      if (!edit) {
        history.push('/dashboard');
      }

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

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      return {
        ...state,
        profile: null,
        profiles: [],
        repos: [],
        loading: false,
        status: 'success'
      };
    },
    decrement: (state) => {
      return state;
    },

    incrementByAmount: (state, action) => {
      return state;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCurrentProfileAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(
        getCurrentProfileAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(getCurrentProfileAsync.fulfilled, (state, action) => {
        return {
          ...state,
          profile: action.payload,
          status: 'success',
          loading: false
        };
      })
      .addCase(createOrUpdateProfileAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(
        createOrUpdateProfileAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(createOrUpdateProfileAsync.fulfilled, (state, action) => {
        return {
          ...state,
          profile: action.payload,
          status: 'success',
          loading: false
        };
      });
  }
});

export const { clearProfile } = profileSlice.actions;

export const profileStatus = (state: RootState) => state.profile;

export default profileSlice.reducer;
