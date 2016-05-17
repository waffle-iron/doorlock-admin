import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

import AltContainer from 'alt-container';
import StudentIdStore from '../../stores/StudentIdStore';
import StudentIdActions from '../../actions/StudentIdActions';
import NotificationActions from '../../actions/NotificationActions';

import MemberForm from '../member.form/MemberForm.jsx';

class AddPage extends React.Component {
  componentWillUnmount() {
    alt.recycle(StudentIdStore);
  }
  onAddMember(newMember,resetForm,invalidate) {
    axios.post('http://192.168.0.112/api/user/add', newMember, {
      headers: {
        'x-access-token': localStorage.token
      }
    })
    .then( (response) => {
      if(response.data.success) {
        NotificationActions.success({
          title: 'Legg til medlem',
          message: 'Medlem lagt til i databasen'
        });
        resetForm();
        StudentIdActions.setStudentId('');
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
            title: 'Legg til medlem',
            message: 'Studentkort er allerede i bruk'
          });
          break;
        case 'Validation error':
          NotificationActions.error({
            title: 'Legg til medlem',
            message: 'Validering feilet på serveren\nPrøv på nytt',
            autoDismiss: 0
          });
          break;
        default:
          NotificationActions.error({
            title: 'Legg til medlem',
            message: 'Feil på serveren\nPrøv på nytt',
            autoDismiss: 0
          });
      }
    });
  }
  render () {
    return (
      <Row>
        <div className='col-md-6' style={{margin:'auto', float:'none'}}>
          <AltContainer stores={{ studentIdProps: StudentIdStore }} actions={{ actions: StudentIdActions }} >
            <MemberForm submit={this.onAddMember} />
          </AltContainer>
        </div>
      </Row>
    );
  }
}

export default AddPage;
