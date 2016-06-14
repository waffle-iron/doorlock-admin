import alt from '../alt';
import StatusActions from '../actions/StatusActions';

class StatusStore {
  constructor() {
    this.log = '';
    this.bindActions(StatusActions);
  }
  onLogData(log) {
    this.log = this.log.concat(log);
  }
  onLockStatusUpdate(state) {
  }
}

export default alt.createStore(StatusStore, 'StatusStore');
