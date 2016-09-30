import React, { PropTypes } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { lockForceOpen, lockForceClose } from '../../redux-Actions/lockStatusActions';

import LockLogStream from '../../components/lock.logstream/LockLogStream.jsx';
import LockStatus from '../../components/lock.status/LockStatus.jsx';

const LockStatusContent = (props) => {
  const {
    isLocked,
    isLoading,
    log,
    socketStatus,
    lockBtnDisabled,
    lockBtnClick } = props;

  if( socketStatus === 'failed' ) {
    return <Alert bsStyle="danger"><strong>Dørlåsserveren svarer ikke</strong></Alert>;
  }

  return (
    <Row>
      <Col md={6}>
        <LockStatus
          lockBtnClick={lockBtnClick}
          isLocked={isLocked}
          isLoading={isLoading}
          lockBtnDisabled={lockBtnDisabled}
        />
      </Col>
      <Col md={6}>
        <LockLogStream log={log} />
      </Col>
    </Row>
  )
}

const mapStateToProps = ({ lockStatus }) => ({
  isLocked: lockStatus.isLocked,
  isLoading: lockStatus.socketStatus === 'connecting',
  socketStatus: lockStatus.socketStatus,
  lockBtnDisabled: lockStatus.lockBtnDisabled,
  log: lockStatus.log
})

const mapDispatchToProps = (dispatch) => ({
  lockBtnClick(isLocked) {
    isLocked ? dispatch(lockForceOpen()) : dispatch(lockForceClose());
  }
})

const LockStatusPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LockStatusContent);

export default LockStatusPage;
