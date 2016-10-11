import React, { PropTypes } from 'react';

import MemberList from '../../components/member.list/MemberList.jsx';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import { connect } from 'react-redux';
import {
  loadMemberPageList,
  filterMemberPageList,
  loadMoreMembersOnPageList } from '../../redux-Actions/entitiesActions';

class MemberListPage extends React.Component {
  componentWillMount() {
    this.props.loadMemberPageList();
  }
  filterChange(inputField) {
    const filter = inputField.target.value
    this.props.filterMemberPageList({ firstName: filter })
  }
  render () {
    const {
      memberList,
      isLoading,
      deleteMember,
      nextPageExists,
      loadMoreMembersOnPageList } = this.props;
    return (
      <Row>
        <fieldset>
          <legend>Filter</legend>
          <form >
            <Col md={6}>
              <FormControl
                placeholder='Fornavn'
                onChange={this.filterChange.bind(this)} />
            </Col>
            <Col md={6}>
              <FormControl
                placeholder='Etternavn'
              />
            </Col>
          </form>
        </fieldset>
        <MemberList
          memberList={memberList}
          isLoading={isLoading}
          deleteMember={deleteMember}
          />
        { nextPageExists ?
          <Button onClick={loadMoreMembersOnPageList}>Load more</Button>
          : '' }
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
    nextPageExists: memberPagination.nextPageExists
  }
}

const MemberPage = connect(
  mapStateToProps,
  {
    loadMemberPageList,
    filterMemberPageList,
    loadMoreMembersOnPageList,
    deleteMember: (id, e) => {
      e.preventDefault();
      console.log(id);
    }
  }
)(MemberListPage)


export default MemberPage;
