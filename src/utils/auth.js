import axios from 'axios';
import { apiBaseUrl } from 'config';
import api from './api';

module.exports = {
  login(loginObj, callback) {
    
    axios.post(apiBaseUrl+'/authenticate', loginObj)
    .then( (response) => {
      if( response.data.success ) {
        localStorage.token = response.data.token;
        api.defaults.headers['x-access-token'] = response.data.token;
        if(callback) callback(true);
        this.onChange(true);
      }else {
        if(callback) callback(false);
        this.onChange(false);
      }
    })
    .catch( (error) => {
      const msg = error.hasOwnProperty('data') ? error.data.message : error.message;
      if(callback) callback(msg);
      this.onChange(false);
    });

  },
  getToken() {
    return localStorage.token;
  },
  loggedIn() {
    return !!localStorage.token;
  },
  onChange() {}
}
