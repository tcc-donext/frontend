import axios from 'axios';

const api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }
});

export default api;
