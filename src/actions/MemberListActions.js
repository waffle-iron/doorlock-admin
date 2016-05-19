import alt from '../alt';
import NotificationActions from './NotificationActions';
import tokenErrorHandler from '../utils/tokenErrorHandler';

const tokenError = (error) => {
  if( error.status === 401 || error.status === 403 ) {
    const pathname = '/medlem/liste';
    tokenErrorHandler(error, pathname);
  }
}

class MemberListActions {
  getMembers() {
    return true;
  }
  getMembersSuccess(result) {
    return result;
  }
  getMembersError(error) {
    tokenError(error);
    switch (error.status) {
      case 500:
        NotificationActions.error({
          title: 'Hent medlemsinfo',
          message: 'Feil med serveren forhindret henting av data'
        });
        break;
      case 400:
        NotificationActions.error({
          title: 'Hent medlemsinfo',
          message: 'Ingen id ble sent med forespørsel til server'
        });
        break;
    }
    return true;
  }
  changePage(newPage) {
    return newPage;
  }
  deleteMember(delMember, event) {
    event.preventDefault();
    return delMember;
  }
  deleteMemberSuccess(delInfo) {
    NotificationActions.success({
      title: 'Slett medlem',
      message: `Medlemmet ${delInfo.name} ble slettet`
    });
    return delInfo.index;
  }
  deleteMemberError(error) {
    tokenError(error);
    switch (error.status) {
      case 500:
        NotificationActions.error({
          title: 'Slett medlem',
          message: 'Feil på serveren forhindret sletting'
        });
        break;
      case 404:
        NotificationActions.error({
          title: 'Slett medlem',
          message: 'Ingen id ble sent med forespørsel til server'
        });
        break;
    }
    return true;
  }
}

export default alt.createActions(MemberListActions);
