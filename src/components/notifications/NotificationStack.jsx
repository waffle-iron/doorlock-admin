import React from 'react'
import NotificationSystem from 'react-notification-system'
import NotificationStore from '../../stores/NotificationStore'

export default class Notifications extends React.Component {
    constructor() {
      super()
      this.onNotificationChange = this.onNotificationChange.bind(this)
      this.notification = {}
    }
    componentWillUnmount() {
      this.unsubscribe()
    }
    componentDidMount() {
      const { store } = this.context;
      this.unsubscribe = store.subscribe(this.onNotificationChange)
    }
    selector(state) {
      return state.notification.notification
    }
    onNotificationChange() {
      const { store: { getState } } = this.context;
      const oldNotificationId = this.notification.uid
      this.notification = this.selector(getState())

      if(oldNotificationId !== this.notification.uid) {
        this.refs.notificationSystem.addNotification(this.notification)
      }
    }
    render() {
      return <NotificationSystem ref='notificationSystem'/>
    }
}

Notifications.contextTypes = {
  store: React.PropTypes.object
}
