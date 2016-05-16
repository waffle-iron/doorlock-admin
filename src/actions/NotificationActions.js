import alt from '../alt'

class NotificationActions {

  addNotification(notification) {
    return notification;
  }
  // Creating aliases: success, error, warning and info

  success(notification) {
    notification.level = 'success';
    this.addNotification(notification);
    return true;
  }

  error(notification) {
    notification.level = 'error';
    this.addNotification(notification);
    return true;
  }

  warning(notification) {
    notification.level = 'warning';
    this.addNotification(notification);
    return true;
  }

  info(notification) {
    notification.level = 'info';
    this.addNotification(notification);
    return true;
  }
}
export default alt.createActions(NotificationActions);
