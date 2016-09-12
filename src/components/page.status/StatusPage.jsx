import React, { PropTypes } from 'react';
import AltContainer from 'alt-container';

import { Row, Col, Alert } from 'react-bootstrap';

import StatusStore from '../../stores/StatusStore';
import StatusActions from '../../actions/StatusActions';

import StatusLog from '../status.loglist/StatusLog.jsx';
import LockStatus from '../status.lockstatus/LockStatus.jsx';

class StatusContent extends React.Component {
  constructor(props) {
    super(props);
    this.lockBtnClick = this.lockBtnClick.bind(this);
  }
  lockBtnClick(isLocked) {
    if(isLocked) {
      return StatusActions.forceOpen();
    }
    else {
      return StatusActions.forceClose();
    }
  }
  render () {
    const { lockStatus: { isLocked }, log, socketStatus, lockBtnDisabled } = this.props;
    const doorlockState = socketStatus === 'connecting';

    if( socketStatus === 'failed' ) {
      return (
        <Alert bsStyle="danger"><strong>Dørlåsserveren svarer ikke</strong></Alert>
      )
    }

    return (
      <Row>
        <Col md={6}>
          <LockStatus
            lockBtnClick={this.lockBtnClick}
            isLocked={isLocked}
            isLoading={doorlockState}
            lockBtnDisabled={lockBtnDisabled}
          />
        </Col>
        <Col md={6}>
          <StatusLog log={log} />
        </Col>
      </Row>
    )
  }
}

const StatusPage = (props) => {
  return (
    <div>
      <AltContainer store={StatusStore}>
          <StatusContent />
      </AltContainer>
    </div>
  )
}

export default StatusPage
