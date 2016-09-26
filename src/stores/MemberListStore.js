import alt from '../alt';
import MemberListActions from '../actions/MemberListActions';
import MemberListSource from '../sources/MemberListSource';
import {
  genInitialListState,
  newFetch,
  changePage,
  deleteItem
} from '../utils/listHelper';

class MemberListStore {
  constructor() {
    this.memberList = [];
    this.listState = genInitialListState();
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
    this.listState = newFetch(result, this.listState);
    this.memberList = [...result.rows];
    this.isLoading = false;
  }
  onGetMembersError() {
    this.isLoading = false;
  }
  onChangePage(newPage) {
    this.listState = changePage(newPage, this.listState);
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
    const { 
      list,
      listState,
      isLoading,
      shouldRefetch } = deleteItem(index, this.memberList, this.listState);

    this.memberList = list;
    this.listState = listState;
    if(shouldRefetch) {
      this.onGetMembers();
    }
    else {
      this.isLoading = false;
    }
  }
  onDeleteMemberError() {
    this.isLoading = false;
  }
}

export default alt.createStore(MemberListStore, 'MemberListStore');
