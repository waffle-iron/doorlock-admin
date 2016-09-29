import alt from '../alt';
import LockStatusActions from '../actions/LockStatusActions';
import lockController from '../utils/lockController';

class LockStatusStore {
  constructor() {
    this.log = '';
    this.socketStatus = 'connecting';
    this.lockBtnDisabled = false;
    this.lockStatus = {
      isLocked: true
    }
    this.bindActions(LockStatusActions);
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

export default alt.createStore(LockStatusStore, 'LockStatusStore');
