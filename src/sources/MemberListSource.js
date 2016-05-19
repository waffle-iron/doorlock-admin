import Actions from '../actions/MemberListActions';
import axios from 'axios';

const MemberListSource = {
  getMembers: {
    remote({filter}) {
      return axios.get('http://192.168.0.112/api/user/', {
        params: filter,
        headers: {
          'x-access-token': localStorage.token
        }
      })
      .then(function (response) {
        // debugger
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
      return axios.delete(`http://192.168.0.112/api/user/delete/${delId}`, {
        headers: {
          'x-access-token': localStorage.token
        }
      })
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
