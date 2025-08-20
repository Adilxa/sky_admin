import axios from 'axios';


const BASE_URL = 'https://skypark.kg/api/';


export const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const MOCKACCESS = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1NzQ5MTUzLCJpYXQiOjE3NTU2NjI3NTMsImp0aSI6IjhkY2NkNDFkNGRjZjQzY2RiMWYxNmY5Zjg0ZTA1OGZkIiwidXNlcl9pZCI6OX0.3mU61dXMRFVSWKZ5ntlIWkkhMa0O4qtTntRBlaFokoE';

$api.interceptors.request.use(config => {
  const accessToken = MOCKACCESS;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
