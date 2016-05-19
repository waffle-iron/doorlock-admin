import React, { PropTypes } from 'react';
import { Pagination } from 'react-bootstrap';

class MemberPagination extends React.Component {
  render () {
    const { actions } = this.props;
    const { memberList, queryCount, currentPage, pages } = this.props.memberStore;
    const showPagination = memberList.length < queryCount;
    return (
      <div style={{textAlign:'center'}}>
        { showPagination ?
        <Pagination
          prev
          next
          first
          last
          ellipsis={false}
          items={pages}
          maxButtons={3}
          activePage={currentPage}
          onSelect={actions.changePage} /> : '' }
      </div>
    );
  }
}

export default MemberPagination;
