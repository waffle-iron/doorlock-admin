import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap';
import MemberForm from '../member.form/MemberForm.jsx';

class AddPage extends React.Component {
  render () {
    return (
      <Row>
        <Col md={6} >
          <MemberForm />
        </Col>
      </Row>
    );
  }
}

export default AddPage;
