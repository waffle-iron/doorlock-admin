import alt from '../alt';
import StatusActions from '../actions/StatusActions';
import lockController from '../utils/lockController';

class StatusStore {
  constructor() {
    this.log = '';
    this.socketStatus = 'connecting';
    this.lockBtnDisabled = false;
    this.lockStatus = {
      isLocked: true
    }
    this.bindActions(StatusActions);
  }
  onActivateLockBtn(status) {
    this.lockBtnDisabled = false;
  }
  onLogData(log) {
    this.log = this.log.concat(log);
  }
  onLockStatusUpdate(status) {
    this.lockStatus = status;
  }
  onForceOpen() {
    lockController.forceOpen();
    this.lockBtnDisabled = true;
  }
  onForceClose() {
    lockController.forceClose();
    this.lockBtnDisabled = true;
  }
  onSetSocketStatus(state) {
    this.socketStatus = state;
  }
}

export default alt.createStore(StatusStore, 'StatusStore');
