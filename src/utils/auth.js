import axios from 'axios';

module.exports = {
  login(loginObj, callback) {
    if( localStorage.token ) {
      if(callback) callback(true);
      this.onChange(true);
      return;
    }
    axios.post('http://doorlock/api/authenticate', loginObj)
    .then( (response) => {
      debugger
      if( response.data.success ) {
        localStorage.token = response.data.token;
        if(callback) callback(true);
        this.onChange(true);
      }else {
        if(callback) callback(false);
        this.onChange(false);
      }
    })
    .catch( (error) => {
      debugger
      const msg = error.hasOwnProperty('<data>') ? error.data.message : error.message;
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
