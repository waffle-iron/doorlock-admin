import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import LeggTil from './components/member.form/MemberForm.jsx';

import App from './components/App.jsx'
// import app components

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/medlem/legg-til' component={LeggTil} />
      </Route>
    </Router>
  );
}
