import { browserHistory } from 'react-router';
import NotificationActions from '../actions/NotificationActions';

const errorHandler = (error, currentPathname) => {

  browserHistory.push({
    pathname: '/logg-inn',
    state: { nextPathname: currentPathname }
  });
  delete localStorage.token;

  switch (error.status) {
    case 401: // Token expired
      NotificationActions.error({
        title: 'Token',
        message: 'Token has expired'
      });
      break;
    case 403: // Token authentication failed
      NotificationActions.error({
        title: 'Token',
        message: 'Godkjenning av token feilet'
      });
      break;
    default:

  }
}

export default errorHandler;
