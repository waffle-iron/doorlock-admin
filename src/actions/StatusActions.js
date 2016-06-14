import alt from '../alt';
import NotificationActions from './NotificationActions';

class StatusActions {
  logData(log) {
    return log;
  }
  lockStatusUpdate(status) {
    return status;
  }
}

export default alt.createActions(StatusActions);
