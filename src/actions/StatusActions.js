import alt from '../alt';
import NotificationActions from './NotificationActions';

class StatusActions {
  logData(log) {
    return log;
  }
  lockStatusUpdate(status) {
    return status;
  }
  forceOpen() {
    return true;
  }
  forceClose() {
    return true;
  }
}

export default alt.createActions(StatusActions);
