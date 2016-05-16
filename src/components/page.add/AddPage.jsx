import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import MemberForm from '../member.form/MemberForm.jsx';

class AddPage extends React.Component {
  onAddMember(newMember) {
    axios.post('http://doorlock/api/user/add?token='+localStorage.token, newMember)
    .then( (response) => {
      debugger
    })
    .catch( (error) => {
      debugger
    });
  }
  render () {
    return (
      <Row>
        <Col md={6} >
          <MemberForm submit={this.onAddMember} />
        </Col>
      </Row>
    );
  }
}

export default AddPage;
