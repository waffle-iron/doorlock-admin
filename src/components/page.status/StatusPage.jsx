import React, { PropTypes } from 'react';
import AltContainer from 'alt-container';
import lockController from '../../utils/lockController';

import { Row, Col } from 'react-bootstrap';

import StatusStore from '../../stores/StatusStore';
import StatusActions from '../../actions/StatusActions';

import StatusLog from '../status.loglist/StatusLog.jsx';

const StatusPage = (props) => {
  return (
    <div>
      <Col md={4}>
      <AltContainer stores={{ store: StatusStore }} actions={{ actions: StatusActions }} >
          <StatusLog />
      </AltContainer>
    </Col>
    </div>
  )
}

export default StatusPage
