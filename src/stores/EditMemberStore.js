import alt from '../alt';
import EditMemberActions from '../actions/EditMemberActions';
import EditMemberSource from '../sources/EditMemberSource';

class EditMemberStore {
  constructor() {
    this.member = {
      firstName: '',
      lastName: '',
      userName: '',
      privateEmail: '',
      mobile: ''
    }
    this.isLoading = false;
    this.memberDontExist = false;

    this.bindActions(EditMemberActions);
    this.registerAsync(EditMemberSource);
  }
  onGetMemberLoading() {
    this.isLoading = true;
  }
  onGetMemberSuccess(member) {
    if(member) {
      this.member = member;
      this.memberDontExist = false;
    }
    else {
      this.memberDontExist = true;
    }
    this.isLoading = false;
  }
  onGetMemberError(err) {
    this.isLoading = false;
  }
  onEditMemberLoading() {
    this.isLoading = true;
  }
  onEditMemberSuccess(member) {
    this.isLoading = false;
  }
  onEditMemberError(err) {
    this.isLoading = false;
  }
}

export default alt.createStore(EditMemberStore, 'EditMemberStore');
