import { browserHistory } from 'react-router'
import { addNotification } from '../redux-Actions/notificationActions'

const tokenErrorMiddleware = ({ getState, dispatch }) => (next) => (action) => {

  const result = next(action)

  if(action.error && (action.error.status === 401 || action.error.status === 403) ) {

    browserHistory.push({
      pathname: '/logg-inn',
      state: { nextPathname: action.error.returnPath || '/' }
    })

    delete localStorage.token

    switch (action.error.status) {
      case 401: // Token expired
        dispatch(addNotification.error({
          title: 'Token',
          message: 'Token has expired'
        }))
        break
      case 403: // Token authentication failed
        dispatch(addNotification.error({
          title: 'Token',
          message: 'Godkjenning av token feilet'
        }))
        break
    }
  }

  return result
}

export default tokenErrorMiddleware
