import axios from 'axios';

export const registerAuthentication = (
  name: string,
  email: string,
  password: string
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, password });

  return axios.post('/api/users', body, config);
};

export const loadAuthentication = () => {
  return axios.get('/api/auth');
};

export const loginAuthentication = (email: string, password: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });

  return axios.post('/api/auth', body, config);
};
