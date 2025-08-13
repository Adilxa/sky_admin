import axios from 'axios';


const BASE_URL = 'https://skypark.kg/api/';


export const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const MOCKACCESS = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MTQ0Njg3LCJpYXQiOjE3NTUwNTgyODcsImp0aSI6ImQ2ZjRlODU1MjY2YTRlMTA4MDE5MGIyMjYwZDdjZGU5IiwidXNlcl9pZCI6OX0.STSMlcRhZdUTT3Oj3z69g5YTgHoG8jj7x4w2GV3d5tM';

$api.interceptors.request.use(config => {
  const accessToken = MOCKACCESS;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
