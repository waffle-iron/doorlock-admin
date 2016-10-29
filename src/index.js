import React from 'react';
import Routes from './routes.jsx';
import lockControl from './utils/lockControl';
import createSagaMiddleware from 'redux-saga';
import configureStore from './store/configureStore';
import rootSaga from './sagas/rootSaga';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore(sagaMiddleware);

sagaMiddleware.run(rootSaga);
lockControl(store);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
