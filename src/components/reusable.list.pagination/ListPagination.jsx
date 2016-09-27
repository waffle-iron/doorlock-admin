import React, { PropTypes } from 'react';
import { Pagination } from 'react-bootstrap';

class ListPagination extends React.Component {
  render () {
    const { currentPage, pages, onChangeSelect } = this.props;
    const showPagination = pages > 1;
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
          onSelect={onChangeSelect} /> : '' }
      </div>
    );
  }
}

export default ListPagination;
