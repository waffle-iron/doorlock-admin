import alt from '../alt';
import NotificationActions from './NotificationActions';
import StudentIdActions from './StudentIdActions';
import tokenErrorHandler from '../utils/tokenErrorHandler';

class EditMemberActions {
  getMemberLoading() {
    return true;
  }
  getMemberSuccess(member) {
    if(member) {
      StudentIdActions.setStudentId(member.studentCardId);
    }
    return member;
  }
  getMemberError(error) {
    if( error.status === 401 || error.status === 403 ) {
      const id = error.config.url;
      const pathname = '/medlem/endre/' + id[id.length - 1];
      tokenErrorHandler(error, pathname);
    }
    else {
      NotificationActions.error({
        title: 'Endre medlemsinfo',
        message: 'Problem med å hente medlem fra serveren.'
      });
    }
    return false;
  }
  editMemberLoading() {
    return true;
  }
  editMemberSuccess() {
    NotificationActions.success({
      title: 'Endre medlemsinfo',
      message: 'Medlem endret'
    });
    return true;
  }
  editMemberError(error) {

    if( error.status === 401 || error.status === 403 ) {
      const id = error.config.url;
      const pathname = '/medlem/endre/' + id[id.length - 1];
      tokenErrorHandler(error, pathname);
    }
    else {
      switch (error.data.message) {
        case 'Student card already in use':
          NotificationActions.error({
            title: 'Endre medlemsinfo',
            message: 'Studentkort er allerede i bruk'
          });
          return 'inUse'
        case 'Validation error':
          NotificationActions.error({
            title: 'Endre medlemsinfo',
            message: 'Validering feilet på serveren\nPrøv på nytt',
            autoDismiss: 0
          });
          break;
        default:
          NotificationActions.error({
            title: 'Endre medlemsinfo',
            message: 'Feil på serveren\nPrøv på nytt',
            autoDismiss: 0
          });
      }
    }
    return false;
  }
}

export default alt.createActions(EditMemberActions);
