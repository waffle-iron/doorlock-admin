import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

import App from './components/App.jsx'
import LeggTil from './components/addpage/AddPage.jsx';

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/medlem/legg-til' component={LeggTil} />
      </Route>
    </Router>
  );
}
