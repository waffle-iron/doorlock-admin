import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from '../reducers';
import tokenErrorMiddleware from '../utils/tokenErrorMiddleware';
import { lockMiddleware } from '../utils/lockControl';

const enhancer = (sagaMiddleware) => {

  return applyMiddleware(
    lockMiddleware,
    sagaMiddleware,
    tokenErrorMiddleware,
    loadingBarMiddleware({
      promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    })
  );
}



const configureStore = (sagaMiddleware) => createStore(rootReducer, enhancer(sagaMiddleware));

export default configureStore;
