import { combineReducers } from 'redux';
import lockStatus from './lockStatus';
import studentIdCard from './studentIdCard';

const app = combineReducers({
  lockStatus,
  studentIdCard
});

export default app;
