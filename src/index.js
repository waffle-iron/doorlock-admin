import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import Routes from './routes.jsx'
import app from './reducers'
import lockControl, { lockMiddleware } from './utils/lockControl';
import tokenErrorMiddleware from './utils/tokenErrorMiddleware';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  app,
  compose(
    applyMiddleware(
      lockMiddleware,
      sagaMiddleware,
      tokenErrorMiddleware,
      loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
      })
    ),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

sagaMiddleware.run(rootSaga)
lockControl(store);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'));
