import { combineReducers } from 'redux';
import lockStatus from './lockStatus';

const app = combineReducers({
  lockStatus
});

export default app;
