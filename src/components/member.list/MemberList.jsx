import React, { PropTypes } from 'react';
import MemberListItem from '../member.list.item/MemberListItem.jsx';
import { ListGroup } from 'react-bootstrap';

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
  render() {
    return (
      <ListGroup componentClass='div'>
        {this.renderMembers()}
      </ListGroup>
    );
  }
}

export default MemberList;
