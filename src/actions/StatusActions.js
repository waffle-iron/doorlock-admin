import alt from '../alt';
import NotificationActions from './NotificationActions';

class StatusActions {
  logData(log) {
    return log;
  }
  lockStatusUpdate(state) {
    return state;
  }
}

export default alt.createActions(StatusActions);
