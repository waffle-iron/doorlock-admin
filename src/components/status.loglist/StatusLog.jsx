import React, { PropTypes } from 'react'

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
      <div ref='scrollBox' className={styles.logBox}>
        {this.props.store.log.split('\n').map(function(line, i) {
          return (
            <span key={i}>
              {line}
              <br/>
            </span>
          )
        })}
      </div>
    );
  }
}

export default StatusLog;
