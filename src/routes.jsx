import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import auth from './utils/auth';

import App from './components/app/App.jsx';
import Login from './pages/login/LoginPage.jsx';
import NotFound from './pages/notfound/NotFoundPage.jsx';

import MedlemsListe from './pages/member.list/MemberListPage.jsx';
import SearchMemberNames from './containers/SearchMemberNames.jsx';
import LeggTilMedlem from './pages/member.add/AddMemberPage.jsx';
import EndreMedlem from './pages/member.edit/EditMemberPage.jsx';

import LockStatus from './pages/lock-status/LockStatusPage.jsx';

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/logg-inn',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}


export default () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to="/lock-status" />
      <Route path='/logg-inn' components={{ login: Login }} />
	    <Route path='/lock-status' components={{ main: LockStatus }} onEnter={requireAuth} />
      <Route path='/medlem/liste' components={{ main: MedlemsListe, search: SearchMemberNames }} onEnter={requireAuth} />
      <Route path='/medlem/legg-til' components={{ main: LeggTilMedlem }} onEnter={requireAuth} />
      <Route path='/medlem/endre/:id' components={{ main: EndreMedlem }} onEnter={requireAuth} />
      <Route path='*' components={{ main: NotFound }} />
    </Route>
  </Router>
);
