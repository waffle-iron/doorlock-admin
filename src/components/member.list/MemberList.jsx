import React, { PropTypes } from 'react';
import MemberListItem from '../member.list.item/MemberListItem.jsx';
import { ListGroup } from 'react-bootstrap';

import styles from './MemberList-style.css';

class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.renderMembers = this.renderMembers.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
  }
  deleteMember(id, e) {
    const { deleteMember } = this.props;
    e.preventDefault();
    deleteMember(id);
  }
  renderMembers() {
    const { memberList } = this.props;

    return memberList.map( (member, i) => {
      const memberName = `${member.firstName} ${member.lastName}`;
      return (
        <MemberListItem
          key={i}
          name={memberName}
          id={member.id}
          onDelete={this.deleteMember.bind(null, member.id)}
        />
      );
    });
  }
  renderLoadingScreen() {
    return (
      <div className={styles.loadingBox}><i className='fa fa-cog fa-spin fa-5x fa-fw'></i></div>
    );
  }
  render() {
    const { isLoading } = this.props;

    return (
      <div style={{position:'relative'}}>
        { isLoading ? this.renderLoadingScreen() : ''}
        <ListGroup componentClass='div'>
          {this.renderMembers()}
        </ListGroup>
      </div>
    );
  }
}

export default MemberList;
