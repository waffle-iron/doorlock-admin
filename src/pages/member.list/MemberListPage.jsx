import React, { PropTypes } from 'react';
import ReusableInfiniteList from '../../components/reusable.infinite.list/ReusableInfiniteList.jsx';
import MemberListItem from '../../components/member.list.item/MemberListItem.jsx';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  loadMemberPageList,
  filterMemberPageList,
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
  filterChange(inputField) {
    const filter = inputField.target.value
    this.props.filterMemberPageList({ firstName: filter })
  }
  renderMember(member, i) {
    const {deleteMember} = this.props;
    const memberName = `${member.firstName} ${member.lastName}`;
    return (
      <MemberListItem
        key={i}
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
      nextPageExists,
      loadMoreMembersOnPageList } = this.props;

    return (
      <Row>
        <fieldset>
          <legend>Filter</legend>
          <form >
            <FormControl
              placeholder='Fornavn'
              onChange={this.filterChange.bind(this)} />
          </form>
        </fieldset>
        <ReusableInfiniteList
          list={memberList}
          renderItem={this.renderMember}
          isLoading={isLoading}
          moreExist={nextPageExists}
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
    nextPageExists: memberPagination.nextPageExists
  }
}

const MemberPage = connect(
  mapStateToProps,
  {
    loadMemberPageList,
    filterMemberPageList,
    loadMoreMembersOnPageList,
    deleteMember
  }
)(MemberListPage)


export default MemberPage;
