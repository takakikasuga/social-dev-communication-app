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

export const addPost = (formData: { text: string }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.post('/api/posts', formData, config);
};

export const getPost = (postId: string) => {
  return axios.get(`/api/posts/${postId}`);
};

export const addComment = (postId: string, formData: { text: string }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.post(`/api/posts/comment/${postId}`, formData, config);
};

export const deleteComment = (postId: string, commentId: string) => {
  return axios.delete(`/api/posts/comment/${postId}/${commentId}`);
};
