import alt from '../alt';
import MemberListActions from '../actions/MemberListActions';
import MemberListSource from '../sources/MemberListSource';

class MemberListStore {
  constructor() {
    this.memberList = [];
    this.queryCount = null;
    this.pages = null;
    this.filter = {
      limit: 2,
      offset: 0,
      order: 'ASC',
      firstName: '',
      lastName: ''
    }
    this.isLoading = false;
    this.bindActions(MemberListActions);
    this.registerAsync(MemberListSource);
  }
  onGetMembers() {
    if (!this.getInstance().isLoading()) {
      this.isLoading = true;
      this.getInstance().getMembers();
    }
  }
  onGetMembersSuccess(result) {
    this.memberList = result.rows;
    this.queryCount = result.count;
    this.pages = Math.ceil(result.count/this.filter.limit);
    this.isLoading = false;
  }
  onGetMembersError() {
    this.isLoading = false;
  }
  onDeleteMember(delMember) {
    if (!this.getInstance().isLoading()) {
      this.isLoading = true;
      this.getInstance().deleteMember(delMember.id, delMember.index, delMember.name);
    }
  }
  onDeleteMemberSuccess(index) {
    this.memberList.splice(index, 1);
    this.isLoading = false;
  }
  onDeleteMemberError() {
    this.isLoading = false;
  }
}

export default alt.createStore(MemberListStore, 'MemberListStore');
