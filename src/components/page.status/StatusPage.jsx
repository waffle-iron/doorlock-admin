import React, { PropTypes } from 'react';
import AltContainer from 'alt-container';

import { Row, Col } from 'react-bootstrap';

import StatusStore from '../../stores/StatusStore';
import StatusActions from '../../actions/StatusActions';

import StatusLog from '../status.loglist/StatusLog.jsx';
import LockStatus from '../status.lockstatus/LockStatus.jsx';

const StatusPage = (props) => {
  return (
    <Row>
      <Col md={6}>
        <AltContainer
          stores={[StatusStore]}
          inject={{
            isLocked() {
              return StatusStore.getState().lockStatus.isLocked;
            }
          }}
          actions={() => {
            return {
              lockBtnClick(isLocked) {
                if(isLocked) {
                  return StatusActions.forceOpen();
                }
                else {
                  return StatusActions.forceClose();
                }
              }
            }
          }}
          >
            <LockStatus />
        </AltContainer>
      </Col>

      <Col md={6}>
        <AltContainer store={StatusStore}>
            <StatusLog />
        </AltContainer>
      </Col>
    </Row>
  )
}

export default StatusPage
