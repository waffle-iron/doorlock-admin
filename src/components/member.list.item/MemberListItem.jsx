import React, { PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import styles from './MemberListItem-style.css';

const MemberListItem = ({name, onDelete, id}) => {
  return (
    <LinkContainer to={'/medlem/edit'+id}>
      <li className={'list-group-item '+ styles.memberItemBox}>
        <div className={styles.txtCol}>
          <p><strong>{name}</strong></p>
        </div>
        <div className={styles.btnCol}>
          <button className={styles.btn} onClick={onDelete}>
            <i className='fa fa-trash fa-2x' title='Slett medlem' />
          </button>
        </div>
      </li>
    </LinkContainer>
  )
}

export default MemberListItem
