import { ADD_NOTIFICATION } from '../constants';

let notId = 0

const notificationCreator = (notification, level) => ({
  type: ADD_NOTIFICATION,
  notification: {
    level,
    uid: notId++,
    ...notification
  }
});

export const addNotification = {
  success: (notification) => notificationCreator(notification,'success'),
  error: (notification) => notificationCreator(notification,'error'),
  warning: (notification) => notificationCreator(notification,'warning'),
  info: (notification) => notificationCreator(notification,'info')
}
