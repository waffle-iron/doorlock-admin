import axios from 'axios';
import { apiBaseUrl } from 'config';

var Api = axios.create({
  baseURL: 'http://doorlock/api',
  headers: {
    'x-access-token': localStorage.token
  }
});

export default Api;
