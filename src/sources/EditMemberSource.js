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
      })
      .catch(function (response) {
        debugger
        console.log(response);
      });
    },
    loading: Actions.getMemberLoading,
    success: Actions.getMemberSuccess,
    error: Actions.getMemberError
  }

}

export default EditMemberSource;
