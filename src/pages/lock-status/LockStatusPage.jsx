import React, { PropTypes } from 'react';
import AltContainer from 'alt-container';

import { Row, Col, Alert } from 'react-bootstrap';

import LockStatusStore from '../../stores/LockStatusStore';
import LockStatusActions from '../../actions/LockStatusActions';

import LockLogStream from '../../components/lock.logstream/LockLogStream.jsx';
import LockStatus from '../../components/lock.status/LockStatus.jsx';

class LockStatusContent extends React.Component {
  constructor(props) {
    super(props);
    this.lockBtnClick = this.lockBtnClick.bind(this);
  }
  lockBtnClick(isLocked) {
    if(isLocked) {
      return LockStatusActions.forceOpen();
    }
    else {
      return LockStatusActions.forceClose();
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
          <LockLogStream log={log} />
        </Col>
      </Row>
    )
  }
}

const LockStatusPage = (props) => {
  return (
    <div>
      <AltContainer store={LockStatusStore}>
          <LockStatusContent />
      </AltContainer>
    </div>
  )
}

export default LockStatusPage
