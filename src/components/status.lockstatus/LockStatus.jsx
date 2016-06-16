import React, { PropTypes } from 'react'
import { Panel, Button } from 'react-bootstrap';

class LockStatus extends React.Component {
  render () {
    const { isLocked, isLoading, lockBtnClick } = this.props;
    const statusString = isLocked ? 'LÅST' : 'ÅPEN';
    const btnString = isLocked ? 'ÅPNE' : 'LÅS';

    return (
      <Panel header={<h3>Låsstatus</h3>} bsStyle='primary'>
        { isLoading ? <i className='fa fa-cog fa-spin fa-3x fa-fw'></i> :
        <div>
          <span style={{marginRight:20}}>Døren er <strong>{statusString}</strong></span>
          <Button bsStyle='info' onClick={lockBtnClick.bind(null,isLocked)}>{btnString}</Button>
        </div>
        }
      </Panel>
    );
  }
}

export default LockStatus;
