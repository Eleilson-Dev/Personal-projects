import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-hamburgueria-umn6.onrender.com/',
  timeout: 60 * 1000,
});
