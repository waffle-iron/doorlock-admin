import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

import styles from './StatusLog-style.css';

class StatusLog extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    const node = this.refs.scrollBox;
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.shouldScrollBottom) {
      const node = this.refs.scrollBox;
      node.scrollTop = node.scrollHeight;
    }
  }
  render () {
    return (
      <Panel header={<h3>Server logg</h3>} bsStyle='primary'>
        <div ref='scrollBox' className={styles.logBox}>
          {this.props.store.log.split('\n').map(function(line, i, arr) {
            if( i === arr.length-1) return null;
            return (<span key={i}>{line}<br/></span>);
          })}
        </div>
      </Panel>
    );
  }
}

export default StatusLog;
