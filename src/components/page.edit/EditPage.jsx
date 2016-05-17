import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

import alt from '../../alt';
import AltContainer from 'alt-container';

import EditMemberStore from '../../stores/EditMemberStore';
import StudentIdStore from '../../stores/StudentIdStore';
import StudentIdActions from '../../actions/StudentIdActions';
import NotificationActions from '../../actions/NotificationActions';

import MemberForm from '../member.form/MemberForm.jsx';

class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.onEditMember = this.onEditMember.bind(this);
  }

  componentDidMount() {
    EditMemberStore.getMember(this.props.routeParams.id);
  }
  componentWillUnmount() {
    alt.recycle(StudentIdStore);
  }
  onEditMember(updatedMember,resetForm,invalidate) { // TODO: Move to EditMemberSource, add isloading
    const dbId = this.props.routeParams.id;
    axios.put(`http://192.168.0.112/api/user/edit/${dbId}`, updatedMember, {
      headers: {
        'x-access-token': localStorage.token
      }
    })
    .then( (response) => {
      if(response.data.success) {
        NotificationActions.success({
          title: 'Endre medlemsinfo',
          message: 'Medlem endret'
        });
      }
      else {
        throw new Error('Api error');
      }
    })
    .catch( (error) => {
      switch (error.data.message) {
        case 'Student card already in use':
          StudentIdActions.setStudentId('');
          NotificationActions.error({
            title: 'Endre medlemsinfo',
            message: 'Studentkort er allerede i bruk'
          });
          break;
        case 'Validation error':
          NotificationActions.error({
            title: 'Endre medlemsinfo',
            message: 'Validering feilet på serveren\nPrøv på nytt',
            autoDismiss: 0
          });
          break;
        default:
          NotificationActions.error({
            title: 'Endre medlemsinfo',
            message: 'Feil på serveren\nPrøv på nytt',
            autoDismiss: 0
          });
      }
    });
  }
  render() {
    return (
      <Row>
        <div className='col-md-6' style={{margin:'auto', float:'none'}}>
          <AltContainer
            failedId={this.props.routeParams.id}
            stores={[EditMemberStore, StudentIdStore]}
            inject={{
              studentIdProps: () => {
                return StudentIdStore.getState();
              },
              defaultValues: () => {
                return EditMemberStore.getState().member;
              },
              memberDontExist: () => {
                return EditMemberStore.getState().memberDontExist;
              },
              failedId: (props) => {
                return props.failedId;
              },
              isLoading: () => {
                return EditMemberStore.getState().isLoading;
              }
            }}
            actions={{ actions: StudentIdActions }}
          >
            <MemberForm submit={this.onEditMember} changeMode />
          </AltContainer>
        </div>
      </Row>
    );
  }
}

export default EditPage;
