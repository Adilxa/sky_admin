import axios from 'axios';


const BASE_URL = 'https://skypark.kg/api/';


export const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const MOCKACCESS = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MDU4NDcyLCJpYXQiOjE3NTQ5NzIwNzIsImp0aSI6ImY2MWZiZTY3YTJiZjQ4YzJhYWFhZWMyMjlkOWQ5ZGVjIiwidXNlcl9pZCI6OX0.BgfO6D6L0GW64VfFQSz75mnSRQeMqfZigNnrRMDo6co';

$api.interceptors.request.use(config => {
  const accessToken = MOCKACCESS;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
