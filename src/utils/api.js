import axios from 'axios';
import { apiBaseUrl } from 'config';

var Api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'x-access-token': localStorage.token
  }
});

export default Api;
