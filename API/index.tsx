import axios from 'axios';

const BASE_URL = 'https://skypark.kg/api/';

export const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const MOCKACCESS = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1ODYzMzMxLCJpYXQiOjE3NTU3NzY5MzEsImp0aSI6ImNiZjQ3NjljYWY3YTQwOTY4ZDc1ODc4ODA4N2ZmNjgwIiwidXNlcl9pZCI6OX0.m1PDzdX0-fntkBevO1MASQVG67jZg78lyi02RIm1l-s';

$api.interceptors.request.use(config => {
  const accessToken = MOCKACCESS;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
