import React, { PropTypes } from 'react';
import { ListGroup } from 'react-bootstrap';
import Waypoint from 'react-waypoint';

class ReusableInfiniteList extends React.Component {
  renderWaypoint(isLoading, loadMore, moreExist) {
    if(!moreExist) return;
    if(isLoading) {
      return this.renderLoading();
    }
    else {
      return <Waypoint bottomOffset='-50px' onEnter={loadMore} />
    }
  }
  renderLoading() {
    return <i className='fa fa-cog fa-spin fa-3x fa-fw'></i>
  }
  render() {
    const {list, renderItem, isLoading, loadMore, moreExist} = this.props;
    return (
      <ListGroup componentClass='div'>
        {list.map(renderItem)}
        {this.renderWaypoint(isLoading, loadMore, moreExist)}
      </ListGroup>
    )
  }
}

export default ReusableInfiniteList;
