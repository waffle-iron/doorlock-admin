import React, { PropTypes } from 'react';
import AltContainer from 'alt-container';

import MemberListStore from '../../stores/MemberListStore';
import MemberListActions from '../../actions/MemberListActions';

import MemberList from '../member.list/MemberList.jsx';
import ListPagination from '../reusable.list.pagination/ListPagination.jsx';
import { Row, Col } from 'react-bootstrap';

class MemberListPage extends React.Component {
  render () {
    return (
      <Row>
        <AltContainer
          stores={{
            memberStore: MemberListStore
          }}
          actions={{ actions: MemberListActions}}
        >
          <MemberList />
        </AltContainer>
        <AltContainer
          stores={[MemberListStore]}
          inject={{
            currentPage: () => {
              return MemberListStore.getState().listState.currentPage;
            },
            pages: () => {
              return MemberListStore.getState().listState.pages;
            },
          }}
        >
          <ListPagination onChangeSelect={MemberListActions.changePage} />
        </AltContainer>
      </Row>
    );
  }
}

export default MemberListPage;
