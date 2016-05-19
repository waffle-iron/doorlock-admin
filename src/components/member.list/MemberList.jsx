import React, { PropTypes } from 'react';
import MemberListItem from '../member.list.item/MemberListItem.jsx';
import { ListGroup } from 'react-bootstrap';

import styles from './MemberList-style.css';

class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.renderMembers = this.renderMembers.bind(this);
  }
  componentWillMount() {
    this.props.actions.getMembers();
  }
  renderMembers() {
    const { memberList } = this.props.memberStore;
    const { actions } = this.props;

    return memberList.map( (member, i) => {
      const memberName = `${member.firstName} ${member.lastName}`;
      return (
        <MemberListItem
          key={i}
          name={memberName}
          id={member.id}
          onDelete={actions.deleteMember.bind(null, {index: i, id: member.id, name: memberName})}
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
    const { isLoading } = this.props.memberStore;

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
