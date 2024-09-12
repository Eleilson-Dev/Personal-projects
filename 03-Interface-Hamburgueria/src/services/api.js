import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-hamburgueria-00xc.onrender.com/',
  timeout: 8000,
});
