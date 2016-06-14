import alt from '../alt';
import StatusActions from '../actions/StatusActions';

class StatusStore {
  constructor() {
    this.log = '';
    this.lockStatus = {}
    this.bindActions(StatusActions);
  }
  onLogData(log) {
    this.log = this.log.concat(log);
  }
  onLockStatusUpdate(status) {
    this.lockStatus = status;
  }
}

export default alt.createStore(StatusStore, 'StatusStore');
