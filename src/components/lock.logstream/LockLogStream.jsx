import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

import styles from './LockLogStream-style.css';

class LockLogStream extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if(this.props.log.length) {
      const node = this.refs.scrollBox;
      this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.shouldScrollBottom && this.props.log.length) {
      const node = this.refs.scrollBox;
      node.scrollTop = node.scrollHeight;
    }
  }
  componentDidMount() {
    const self = this;
    window.setTimeout(() => {
      if(self.refs.scrollBox) {
        const node = self.refs.scrollBox;
        node.scrollTop = node.scrollHeight;
      }
    }, 100);
  }
  renderBox() {
    const log = this.props.log;
    if( !log.length ) {
      return (<i className='fa fa-cog fa-spin fa-3x fa-fw'></i>);
    }
    return (
      <div ref='scrollBox' className={styles.logBox}>
        {this.props.log.split('\n').map(function(line, i, arr) {
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

export default LockLogStream;
