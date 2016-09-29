import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import auth from './utils/auth';

import App from './components/App.jsx';
import Login from './pages/login/LoginPage.jsx';
import MedlemsListe from './pages/member.list/MemberListPage.jsx';
import LeggTilMedlem from './pages/member.add/AddMemberPage.jsx';
import EndreMedlem from './pages/member.edit/EditMemberPage.jsx';
import NotFound from './pages/notfound/NotFoundPage.jsx';
import StatusPage from './pages/status/StatusPage.jsx';

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/logg-inn',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRedirect to="/status" />
        <Route path='/logg-inn' component={Login} />
		    <Route path='/status' component={StatusPage} onEnter={requireAuth}/>
        <Route path='/medlem/liste' component={MedlemsListe} onEnter={requireAuth}/>
        <Route path='/medlem/legg-til' component={LeggTilMedlem} onEnter={requireAuth}/>
        <Route path='/medlem/endre/:id' component={EndreMedlem} onEnter={requireAuth}/>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  );
}
