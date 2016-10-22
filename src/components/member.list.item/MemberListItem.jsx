import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './MemberListItem-style.scss';

const MemberListItem = ({name, onDelete, id}) => {
  return (
      <Link to={'/medlem/endre/'+id} className={'list-group-item '+ styles.memberItemBox}>
        <div className={styles.txtCol}>
          <p><strong>{name}</strong></p>
        </div>
        <div className={styles.btnCol}>
          <button className={styles.btn} onClick={onDelete}>
            <i className='fa fa-trash fa-2x' title='Slett medlem' />
          </button>
        </div>
      </Link>
  )
}

export default MemberListItem
