import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-hamburgueria-mcyo.onrender.com',
  timeout: 60 * 8000,
});
