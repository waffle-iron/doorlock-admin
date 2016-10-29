import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from '../reducers';
import tokenErrorMiddleware from '../utils/tokenErrorMiddleware';
import { lockMiddleware } from '../utils/lockControl';

const enhancer = (sagaMiddleware) => {

  return compose(
    applyMiddleware(
      lockMiddleware,
      sagaMiddleware,
      tokenErrorMiddleware,
      loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
      })
    ),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  );
}


const configureStore = (sagaMiddleware) => {
  const store = createStore(rootReducer, enhancer(sagaMiddleware));

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}

export default configureStore;
