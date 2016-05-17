import alt from '../alt';
import NotificationActions from './NotificationActions';
import StudentIdActions from './StudentIdActions';

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
  getMemberError(err) {
    return err;
  }
}

export default alt.createActions(EditMemberActions);
