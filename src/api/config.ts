import axios from 'axios';
import {AsyncKeys, getItem} from '../constants/helpers';

export const baseUrl = 'https://www.tumerfashion.com/shop/index.php?route=';

export const headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
  'x-requested-api': 'ocapi',
  'x-requested-with': 'XMLHttpRequest',
  Accept: 'application/json',
};

export const axiosAPI = axios.create({
  baseURL: baseUrl,
  headers: headers,
});

// axiosAPI.interceptors.request.use(
//   async config => {
//     const language = (await getItem(AsyncKeys.LANGUAGE)) || '';
//     if (language) {
//       config.headers['Accept-Language'] = language;
//     }

//     return config;
//   },
//   error => {
//     console.log('error ', error);

//     Promise.reject(error);
//   },
// );
