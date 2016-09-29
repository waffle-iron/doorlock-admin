import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

const NotFoundPage = (props) => {
  return (
    <Row>
      <Col md={12}>
        <h6>Siden du leter etter finnes ikke</h6>
      </Col>
    </Row>
  )
}

export default NotFoundPage
