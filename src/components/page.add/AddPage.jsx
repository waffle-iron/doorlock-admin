import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';

import alt from '../../alt';
import AltContainer from 'alt-container';
import StudentIdStore from '../../stores/StudentIdStore';
import StudentIdActions from '../../actions/StudentIdActions';
import NotificationActions from '../../actions/NotificationActions';
import tokenErrorHandler from '../../utils/tokenErrorHandler';

import MemberForm from '../member.form/MemberForm.jsx';

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.onAddMember = this.onAddMember.bind(this);
  }
  componentWillUnmount() {
    alt.recycle(StudentIdStore);
  }
  onAddMember(newMember,resetForm,invalidate) {
    const pathname = this.props.location.pathname;
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

      // Token expired or not correct
      if( error.status === 401 || error.status === 403 ) {
        tokenErrorHandler(error, pathname);
      }
      else {
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
            message: 'Feil på serveren. Prøv på nytt',
            autoDismiss: 0
          });
        }
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
