import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

import styles from './StatusLog-style.css';

class StatusLog extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if(this.props.store.log.length) {
      const node = this.refs.scrollBox;
      this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.shouldScrollBottom && this.props.store.log.length) {
      const node = this.refs.scrollBox;
      node.scrollTop = node.scrollHeight;
    }
  }
  renderBox() {
    const log = this.props.store.log;
    if( !log.length ) {
      return (<i className='fa fa-cog fa-spin fa-3x fa-fw'></i>);
    }
    return (
      <div ref='scrollBox' className={styles.logBox}>
        {this.props.store.log.split('\n').map(function(line, i, arr) {
          if( i === arr.length-1) return null;
          return (<span key={i}>{line}<br/></span>);
        })}
      </div>
    );

  }
  render () {

    return (
      <Panel header={<h3>Server logg</h3>} bsStyle='primary'>
        {this.renderBox()}
      </Panel>
    );
  }
}

export default StatusLog;
