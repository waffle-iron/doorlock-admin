import alt from '../alt';
import NotificationActions from '../actions/NotificationActions';

class NotificationStore {
  constructor() {
    this.notification = null;
    this.bindListeners({
      onAddNotification: NotificationActions.addNotification
    })
  }
  onAddNotification(notification) {
    this.notification = notification;
  }
}

export default alt.createStore(NotificationStore, 'NotificationStore');
