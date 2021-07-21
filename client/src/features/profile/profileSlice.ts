import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Dispatch
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import * as H from 'history';
import { v4 } from 'uuid';

import {
  getCurrentProfile,
  getAllProfiles,
  getProfileById,
  getGithubRepos,
  createOrUpdateProfile,
  addExperienceProfile,
  addEducationProfile,
  deleteExperienceProfile,
  deleteEducationProfile,
  deleteAccount
} from './profileAPI';

import { logout } from '../auth/authSlice';

import { setAlert, removeAlertAsync } from '../alert/alertSlice';
import { CreateProfileValue } from '../../components/profile-form/CreateProfile';
import { AddExperienceValue } from '../../components/profile-form/AddExperience';
import { AddEducationValue } from '../../components/profile-form/AddEducation';

export interface ProfileData {
  _id: string;
  skills: string[];
  status: string;
  date: string;
  __v?: number;
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
    to?: string;
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
  profiles: ProfileData[];
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
>('profile/getCurrentProfile', async ({}, { dispatch, rejectWithValue }) => {
  try {
    const response = await getCurrentProfile();
    console.log('getCurrentProfileAsync/response', response);

    return response.data;
  } catch (err: any) {
    // エラーハンドリング
    dispatch(clearProfile());
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

export const getAllProfilesAsync = createAsyncThunk<
  ProfileData,
  {},
  ThunkConfig
>('profile/getAllProfiles', async ({}, { dispatch, rejectWithValue }) => {
  // 都度自アカウントのプロフィール情報は削除する
  dispatch(clearProfile());
  try {
    const response = await getAllProfiles();
    console.log('getAllProfilesAsync/response', response);

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

export const getProfileByIdAsync = createAsyncThunk<
  ProfileData,
  string,
  ThunkConfig
>('profile/getProfileById', async (userId, { dispatch, rejectWithValue }) => {
  try {
    const response = await getProfileById(userId);
    console.log('getProfileByIdAsync/response', response);

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

export const getGithubReposAsync = createAsyncThunk<
  ProfileData,
  string,
  ThunkConfig
>('profile/GithubRepos', async (username, { dispatch, rejectWithValue }) => {
  try {
    const response = await getGithubRepos(username);
    console.log('getGithubRepos/response', response);

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

export const addExperienceAsync = createAsyncThunk<
  any,
  { formData: AddExperienceValue; history: H.History },
  ThunkConfig
>(
  'profile/addExperience',
  async ({ formData, history }, { dispatch, rejectWithValue }) => {
    try {
      const response = await addExperienceProfile(formData);
      console.log('addExperienceAsync/response', response);
      const id = v4();
      dispatch(
        setAlert({
          message: 'Experience Added',
          alertType: 'success',
          id
        })
      );
      dispatch(removeAlertAsync({ id, timeout: 5000 }));
      history.push('/dashboard');

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

export const addEducationAsync = createAsyncThunk<
  any,
  { formData: AddEducationValue; history: H.History },
  ThunkConfig
>(
  'profile/addEducation',
  async ({ formData, history }, { dispatch, rejectWithValue }) => {
    try {
      const response = await addEducationProfile(formData);
      console.log('addEducationAsync/response', response);
      const id = v4();
      dispatch(
        setAlert({
          message: 'Education Added',
          alertType: 'success',
          id
        })
      );
      dispatch(removeAlertAsync({ id, timeout: 5000 }));
      history.push('/dashboard');

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

export const deleteExperienceAsync = createAsyncThunk<any, string, ThunkConfig>(
  'profile/deleteExperience',
  async (objectId, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteExperienceProfile(objectId);

      const id = v4();
      dispatch(
        setAlert({
          message: 'Experience Deleted',
          alertType: 'success',
          id
        })
      );
      dispatch(removeAlertAsync({ id, timeout: 5000 }));

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

export const deleteEducationAsync = createAsyncThunk<any, string, ThunkConfig>(
  'profile/deleteEducation',
  async (objectId, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteEducationProfile(objectId);

      const id = v4();
      dispatch(
        setAlert({
          message: 'Education Deleted',
          alertType: 'success',
          id
        })
      );
      dispatch(removeAlertAsync({ id, timeout: 5000 }));

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

export const deleteAccountAsync = createAsyncThunk<any, {}, ThunkConfig>(
  'profile/deleteAccount',
  async ({}, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteAccount();
      dispatch(logout());
      const id = v4();
      dispatch(
        setAlert({
          message: 'Account Deleted',
          alertType: 'success',
          id
        })
      );
      dispatch(removeAlertAsync({ id, timeout: 5000 }));

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
            profile: null,
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
      .addCase(getProfileByIdAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(
        getProfileByIdAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            profile: null,
            error: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(getProfileByIdAsync.fulfilled, (state, action) => {
        return {
          ...state,
          profile: action.payload,
          status: 'success',
          loading: false
        };
      })
      .addCase(getAllProfilesAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(
        getAllProfilesAsync.rejected,
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
        getAllProfilesAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            profiles: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(getGithubReposAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(
        getGithubReposAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(getGithubReposAsync.fulfilled, (state, action) => {
        return {
          ...state,
          repos: action.payload,
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
      })
      .addCase(addExperienceAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(
        addExperienceAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(addExperienceAsync.fulfilled, (state, action) => {
        return {
          ...state,
          profile: action.payload,
          status: 'success',
          loading: false
        };
      })
      .addCase(addEducationAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(
        addEducationAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(addEducationAsync.fulfilled, (state, action) => {
        return {
          ...state,
          profile: action.payload,
          status: 'success',
          loading: false
        };
      })
      .addCase(deleteExperienceAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(
        deleteExperienceAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(deleteExperienceAsync.fulfilled, (state, action) => {
        return {
          ...state,
          profile: action.payload,
          status: 'success',
          loading: false
        };
      })
      .addCase(deleteEducationAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(
        deleteEducationAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(deleteEducationAsync.fulfilled, (state, action) => {
        return {
          ...state,
          profile: action.payload,
          status: 'success',
          loading: false
        };
      })
      .addCase(deleteAccountAsync.pending, (state) => {
        state.status = 'loading';
        return state;
      })
      .addCase(
        deleteAccountAsync.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            error: action.payload,
            status: 'success',
            loading: false
          };
        }
      )
      .addCase(deleteAccountAsync.fulfilled, (state) => {
        return {
          ...state,
          profile: null,
          profiles: [],
          repos: [],
          loading: false,
          status: 'success'
        };
      });
  }
});

export const { clearProfile } = profileSlice.actions;

export const profileStatus = (state: RootState) => state.profile;

export default profileSlice.reducer;
