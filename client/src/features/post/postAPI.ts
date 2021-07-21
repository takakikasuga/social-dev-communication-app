import axios from 'axios';

export const getAllPosts = () => {
  return axios.get('/api/posts');
};

export const addLikePost = (postId: string) => {
  return axios.put(`/api/posts/likes/${postId}`);
};

export const removeLikePost = (postId: string) => {
  return axios.put(`/api/posts/unlikes/${postId}`);
};

export const deletePost = (postId: string) => {
  return axios.delete(`/api/posts/${postId}`);
};

export const addPost = (formData: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.post('/api/posts', formData, config);
};
