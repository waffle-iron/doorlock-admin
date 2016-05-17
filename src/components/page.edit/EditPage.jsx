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
  onEditMember(updatedMember,resetForm,invalidate) {
    const dbId = this.props.routeParams.id;
    EditMemberStore.editMember(dbId, updatedMember);
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
