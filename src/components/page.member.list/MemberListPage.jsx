import React, { PropTypes } from 'react';
import AltContainer from 'alt-container';

import MemberListStore from '../../stores/MemberListStore';
import MemberListActions from '../../actions/MemberListActions';

import MemberList from '../member.list/MemberList.jsx';
import ListPagination from '../reusable.list.pagination/ListPagination.jsx';
import { Row, Col } from 'react-bootstrap';

class MemberListPage extends React.Component {
  componentWillMount() {
    MemberListActions.getMembers();
  }
  render () {
    return (
      <Row>
        <AltContainer
          stores={[MemberListStore]}
          inject={{
            memberList: () => MemberListStore.getState().memberList,
            isLoading: () => MemberListStore.getState().isLoading
          }}
          actions={(props) => ({
              deleteMember: (delMember, e) => {
                e.preventDefault();
                MemberListActions.deleteMember(delMember);
              }
          })}
        >
          <MemberList />
        </AltContainer>
        <AltContainer
          stores={[MemberListStore]}
          inject={{
            currentPage: () => MemberListStore.getState().listState.currentPage,
            pages: () => MemberListStore.getState().listState.pages
          }}
          actions={(props) => ({
            onChangeSelect: (newPage) => MemberListActions.changePage(newPage)
          })}
        >
          <ListPagination />
        </AltContainer>
      </Row>
    );
  }
}

export default MemberListPage;
