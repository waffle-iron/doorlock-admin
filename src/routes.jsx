import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import App from './components/App.jsx'
// import app components

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}/>
    </Router>
  );
}
