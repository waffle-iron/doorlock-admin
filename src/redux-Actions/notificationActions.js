import { ADD_NOTIFICATION } from '../constants';

const notificationCreator = (notification, level) => ({
  type: ADD_NOTIFICATION,
  notification: {
    level,
    ...notification
  }
});

export const addNotification = {
  success: (notification) => notificationCreator(notification,'success'),
  error: (notification) => notificationCreator(notification,'error'),
  warning: (notification) => notificationCreator(notification,'warning'),
  info: (notification) => notificationCreator(notification,'info')
}
