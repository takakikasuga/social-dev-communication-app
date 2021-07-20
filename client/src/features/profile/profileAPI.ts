import axios from 'axios';
import { CreateProfileValue } from '../../components/profile-form/CreateProfile';
import { AddExperienceValue } from '../../components/profile-form/AddExperience';

export const getCurrentProfile = () => {
  return axios.get('api/profile/me');
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

export const addEducationProfile = (formData: AddExperienceValue) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.put('/api/profile/education', formData, config);
};
