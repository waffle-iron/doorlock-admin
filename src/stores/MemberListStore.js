import alt from '../alt';
import MemberListActions from '../actions/MemberListActions';
import MemberListSource from '../sources/MemberListSource';

class MemberListStore {
  constructor() {
    this.memberList = [];
    this.queryCount = null;
    this.pages = 1;
    this.currentPage = 1;
    this.filter = {
      limit: 10,
      offset: 0,
      // order: 'ASC',
      // firstName: '',
      // lastName: ''
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
  onChangePage(newPage) {
    this.filter.offset = (newPage - 1) * this.filter.limit;
    this.currentPage = newPage;
    this.isLoading = true;
    this.getInstance().getMembers();
  }
  onDeleteMember(delMember) {
    if (!this.getInstance().isLoading()) {
      this.isLoading = true;
      this.getInstance().deleteMember(delMember.id, delMember.index, delMember.name);
    }
  }
  onDeleteMemberSuccess(index) {
    this.memberList.splice(index, 1);
    if( this.memberList.length === 0 && this.currentPage > 1 ) {
      this.currentPage = this.currentPage - 1;
      this.filter.offset = (this.currentPage - 1) * this.filter.limit;
      this.getInstance().getMembers();
    }
    else if ( this.currentPage === this.pages ) {
      this.isLoading = false;
    }
    else {
      this.getInstance().getMembers();
    }
  }
  onDeleteMemberError() {
    this.isLoading = false;
  }
}

export default alt.createStore(MemberListStore, 'MemberListStore');
