import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import Routes from './routes.jsx'
import app from './reducers'
import lockControl, { lockMiddleware } from './utils/lockControl';

let store = createStore(
  app,
  compose(
    applyMiddleware(lockMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

lockControl(store);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'));
