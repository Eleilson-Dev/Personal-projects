import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-hamburgueria-vpbb.onrender.com',
  timeout: 60 * 8000,
});
