import React, { PropTypes } from 'react';
import { Pagination } from 'react-bootstrap';

class MemberPagination extends React.Component {
  render () {
    const { actions } = this.props;
    const { memberList, listState } = this.props.memberStore;
    const { queryCount, currentPage, pages } = listState;

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
