import alt from '../alt';
import NotificationActions from './NotificationActions';

class StudentIdActions {
  setStudentId(id) {
    return id;
  }
  scanCard() {
    return true;
  }
  scanCardSuccess(newId) {
    return newId;
  }
  scanCardError(err) {
    NotificationActions.error({
      title: 'Scanning av kort',
      message: err.message
    });
    return err;
  }
}

export default alt.createActions(StudentIdActions);
