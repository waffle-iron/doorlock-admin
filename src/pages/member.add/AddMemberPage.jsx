import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap';
import api from '../../utils/api';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { scanIdCard, setStudentId } from '../../redux-Actions/studentIdCardActions';
import NotificationActions from '../../actions/NotificationActions';
import tokenErrorHandler from '../../utils/tokenErrorHandler';

import MemberForm from '../../components/member.form/MemberForm.jsx';

class AddMemberPageComp extends React.Component {
  constructor(props) {
    super(props);
    this.onAddMember = this.onAddMember.bind(this);
  }
  componentWillUnmount() {
    const { resetId } = this.props;
    resetId();
  }
  onAddMember(newMember,resetForm,invalidate) {
    const pathname = this.props.location.pathname;
    const { resetId } = this.props;
    api.post('/user/add', newMember)
    .then( (response) => {
      if(response.data.success) {
        NotificationActions.success({
          title: 'Legg til medlem',
          message: 'Medlem lagt til i databasen'
        });
        resetForm();
        resetId();
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
          resetId();
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
          <MemberForm submit={this.onAddMember} {...this.props} />
        </div>
      </Row>
    );
  }
}

const mapStateToProps = ({ studentIdCard }) => ({
  studentIdProps: {
    isLoading: studentIdCard.isLoading,
    studId: studentIdCard.cardId
  }
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { studentIdProps } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    studentIdProps,
    scanCard: () => dispatch(scanIdCard()),
    resetId: () => {
      if(studentIdProps.studId !== '') {
        dispatch(setStudentId(''));
      }
    }
  }
}

const AddMemberPage = connect(
  mapStateToProps,
  null,
  mergeProps
)(AddMemberPageComp)

export default AddMemberPage;
