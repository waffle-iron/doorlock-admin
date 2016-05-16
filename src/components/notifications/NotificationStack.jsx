import React from 'react'
import NotificationSystem from 'react-notification-system'
import NotificationStore from '../../stores/NotificationStore'

export default class Notifications extends React.Component {
    constructor() {
      super()
      this.onNotificationChange = this.onNotificationChange.bind(this)
    }
    componentWillUnmount() {
        NotificationStore.unlisten(this.onNotificationChange)
    }
    componentDidMount() {
        NotificationStore.listen(this.onNotificationChange)
    }
    /** Usage: NotificationActions.[success,error,warning,info] */
    onNotificationChange() {
        let notification = NotificationStore.getState().notification
        this.refs.notificationSystem.addNotification(notification)
    }
    render() {
        return <NotificationSystem ref='notificationSystem'/>
    }

}
