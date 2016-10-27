import React, { PropTypes } from 'react';
import ReusableInfiniteList from '../../components/reusable.infinite.list/ReusableInfiniteList.jsx';
import MemberListItem from '../../components/member.list.item/MemberListItem.jsx';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  loadMemberPageList,
  loadMoreMembersOnPageList,
  deleteMember } from '../../actions/entitiesActions';

class MemberListPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderMember = this.renderMember.bind(this);
  }
  componentWillMount() {
    this.props.loadMemberPageList();
  }
  renderMember(member, i) {
    const {deleteMember} = this.props;
    const memberName = `${member.firstName} ${member.lastName}`;
    return (
      <MemberListItem
        key={member.id}
        name={memberName}
        id={member.id}
        onDelete={deleteMember}
      />
    )
  }
  render () {
    const {
      memberList,
      isLoading,
      deleteMember,
      moreExists,
      loadMoreMembersOnPageList } = this.props;

    return (
      <Row>
        <ReusableInfiniteList
          list={memberList}
          renderItem={this.renderMember}
          isLoading={isLoading}
          moreExist={moreExists}
          loadMore={loadMoreMembersOnPageList}
        />
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  const memberPagination = state.pagination.members || { ids: [] };
  const users = state.entities.users;
  const memberList = memberPagination.ids.map( (id) => users[id] );

  return {
    memberList,
    isLoading: memberPagination.isLoading,
    moreExists: memberPagination.nextPageExists && !!memberPagination.pageCount
  }
}

const MemberPage = connect(
  mapStateToProps,
  {
    loadMemberPageList,
    loadMoreMembersOnPageList,
    deleteMember
  }
)(MemberListPage)


export default MemberPage;
