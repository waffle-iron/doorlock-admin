import React, { PropTypes } from 'react';

import MemberList from '../../components/member.list/MemberList.jsx';
import { Row, Col, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import {
  loadMemberListPage,
  loadMoreMembersOnListPage } from '../../redux-Actions/entitiesActions';

class MemberListPage extends React.Component {
  componentWillMount() {
    this.props.loadMemberListPage();
  }
  render () {
    const {
      memberList,
      isLoading,
      deleteMember,
      nextPageExists,
      loadMoreMembersOnListPage } = this.props;
    return (
      <Row>
        <MemberList
          memberList={memberList}
          isLoading={isLoading}
          deleteMember={deleteMember}
          />
        { nextPageExists ?
          <Button onClick={loadMoreMembersOnListPage}>Load more</Button>
          : '' }
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  const memberPagination = state.pagination.pageScrolls.members || { ids: [] };
  const users = state.entities.users;
  const memberList = memberPagination.ids.map( (id) => users[id] );

  return {
    memberList,
    isLoading: memberPagination.isLoading,
    nextPageExists: memberPagination.nextPageExists
  }
}

const MemberPage = connect(
  mapStateToProps,
  {
    loadMemberListPage,
    loadMoreMembersOnListPage,
    deleteMember: (id, e) => {
      e.preventDefault();
      console.log(id);
    }
  }
)(MemberListPage)


export default MemberPage;
