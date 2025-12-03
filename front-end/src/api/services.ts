import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust base URL as needed
});

// Utility functions for local storage
export const setWithExpiry = (key: string, value: any, ttl: number) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl, // TTL in milliseconds
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

// Auth Services
export const signup = (userData: any) => API.post('/auth/signup', userData);
export const login = (credentials: any) => API.post('/auth/login', credentials);

// Extend with other services as needed
