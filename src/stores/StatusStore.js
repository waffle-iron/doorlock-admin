import alt from '../alt';
import StatusActions from '../actions/StatusActions';
import lockController from '../utils/lockController';

class StatusStore {
  constructor() {
    this.log = '';
    this.lockStatus = {
      isLocked: true
    }
    this.bindActions(StatusActions);
  }
  onLogData(log) {
    this.log = this.log.concat(log);
  }
  onLockStatusUpdate(status) {
    this.lockStatus = status;
  }
  onForceOpen() {
    lockController.forceOpen();
  }
  onForceClose() {
    lockController.forceClose();
  }
}

export default alt.createStore(StatusStore, 'StatusStore');
