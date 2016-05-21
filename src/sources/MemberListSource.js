import Actions from '../actions/MemberListActions';
import api from '../utils/api';

const MemberListSource = {
  getMembers: {
    remote({filter}) {
      return api.get('/user', {
        params: filter,
      })
      .then(function (response) {
        if(response.data.success) {
          return response.data.data;
        }
        else {
          throw new Error('Api error');
        }
      });
    },
    success: Actions.getMembersSuccess,
    error: Actions.getMembersError
  },
  deleteMember: {
    remote(state,delId, delIndex, delName) {
      return api.delete(`/user/delete/${delId}`)
      .then(function (response) {
        if(response.data.success) {
          return { index: delIndex, name: delName };
        }
        else {
          throw new Error('Api error');
        }
      });
    },
    success: Actions.deleteMemberSuccess,
    error: Actions.deleteMemberError
  }
}

export default MemberListSource;
