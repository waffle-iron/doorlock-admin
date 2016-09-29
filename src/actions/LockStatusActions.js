import alt from '../alt';
import NotificationActions from './NotificationActions';

class LockStatusActions {
  activateLockBtn(status) {
    return status;
  }
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
  setSocketStatus(state) {
    return state;
  }
}

export default alt.createActions(LockStatusActions);
