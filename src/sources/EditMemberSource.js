import Actions from '../actions/EditMemberActions';
import axios from 'axios';

const EditMemberSource = {
  getMember: {
    remote(props,id) {
      return axios.get(`http://192.168.0.112/api/user/findByID/${id}`, {
        headers: {
          'x-access-token': localStorage.token
        }
      })
      .then(function (response) {
        if(response.data.success) {
          if( response.data.data ) {
            return response.data.data;
          }
          else {
            return false;
          }
        }
        else {
          throw new Error('shit happens');
        }
      });
    },
    loading: Actions.getMemberLoading,
    success: Actions.getMemberSuccess,
    error: Actions.getMemberError
  },
  editMember: {
    remote(props, dbId, updatedMember) {
      return axios.put(`http://192.168.0.112/api/user/edit/${dbId}`, updatedMember, {
        headers: {
          'x-access-token': localStorage.token
        }
      })
      .then( (response) => {
        if(response.data.success) {
          return true
        }
        else {
          throw new Error('Api error');
        }
      });
    },
    loading: Actions.editMemberLoading,
    success: Actions.editMemberSuccess,
    error: Actions.editMemberError
  }

}

export default EditMemberSource;
