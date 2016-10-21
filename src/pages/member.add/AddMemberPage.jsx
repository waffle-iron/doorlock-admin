import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { scanIdCard } from '../../actions/studentIdCardActions';
import { createMember } from '../../actions/entitiesActions';
import MemberForm from '../../components/member.form/MemberForm.jsx';


const AddMemberPageStateless = ({ waitingForCardScan, scanIdCard, createMember }) => (
  <Row>
    <div className='col-md-6' style={{margin:'auto', float:'none'}}>
      <MemberForm
        form='addMember'
        title='Legg til medlem'
        submitBtnTxt='Legg til medlem'
        scanCard={{
          isLoading: waitingForCardScan,
          click: scanIdCard
        }}
        onSubmit={createMember}  />
    </div>
  </Row>
)

const AddMemberPage = connect(
  (state) => ({ waitingForCardScan: state.studentIdCard.isLoading }),
  {
    scanIdCard: scanIdCard.bind(null,'addMember'),
    createMember: createMember.bind(null, 'addMember')
  }
)(AddMemberPageStateless)

export default AddMemberPage;
