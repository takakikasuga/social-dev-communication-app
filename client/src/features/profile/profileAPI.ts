import axios from 'axios';
import { CreateProfileValue } from '../../components/profile-form/CreateProfile';

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
