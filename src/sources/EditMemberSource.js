import Actions from '../actions/EditMemberActions';
import api from '../utils/api';

const EditMemberSource = {
  getMember: {
    remote(props,id) {
      return api.get(`/user/findByID/${id}`)
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
      return api.put(`/user/edit/${dbId}`, updatedMember)
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
