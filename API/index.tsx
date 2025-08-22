import axios from 'axios';

const BASE_URL = 'https://skypark.kg/api/';

export const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const MOCKACCESS = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1OTIxMTY2LCJpYXQiOjE3NTU4MzQ3NjYsImp0aSI6IjcxZjZkNTA3NGU4ZjQxZWI4MDVmMTBhZmZlYjhmYmMwIiwidXNlcl9pZCI6OX0.olEQxQWgha8n_ahfyr5bdXmM1KbBkWWV7fMUQqnJavY';

$api.interceptors.request.use(config => {
  const accessToken = MOCKACCESS;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
