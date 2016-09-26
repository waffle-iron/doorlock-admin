import React, { PropTypes } from 'react';
import AltContainer from 'alt-container';

import MemberListStore from '../../stores/MemberListStore';
import MemberListActions from '../../actions/MemberListActions';

import MemberList from '../member.list/MemberList.jsx';
import MemberPagination from '../member.list.pagination/Pagination.jsx';
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
          <MemberPagination />
        </AltContainer>
      </Row>
    );
  }
}

export default MemberListPage;
