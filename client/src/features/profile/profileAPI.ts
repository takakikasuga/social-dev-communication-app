import axios from 'axios';
import { CreateProfileValue } from '../../components/profile-form/CreateProfile';
import { AddExperienceValue } from '../../components/profile-form/AddExperience';
import { AddEducationValue } from '../../components/profile-form/AddEducation';

export const getCurrentProfile = () => {
  return axios.get('/api/profile/me');
};

export const getAllProfiles = () => {
  return axios.get('/api/profile');
};

export const getProfileById = (userId: string) => {
  console.log('通信一歩手前');
  return axios.get(`/api/profile/user/${userId}`);
};

export const getGithubRepos = (username: string) => {
  return axios.get(`/api/profile/github/${username}`);
};

export const createOrUpdateProfile = (formData: CreateProfileValue) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.post('/api/profile', formData, config);
};

export const addExperienceProfile = (formData: AddExperienceValue) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.put('/api/profile/experience', formData, config);
};

export const addEducationProfile = (formData: AddEducationValue) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.put('/api/profile/education', formData, config);
};

export const deleteExperienceProfile = (objectId: string) => {
  return axios.delete(`/api/profile/experience/${objectId}`);
};

export const deleteEducationProfile = (objectId: string) => {
  return axios.delete(`/api/profile/education/${objectId}`);
};

export const deleteAccount = () => {
  return axios.delete('/api/profile/');
};
