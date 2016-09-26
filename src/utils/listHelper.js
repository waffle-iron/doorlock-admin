
export const genInitialListState = () => {
  return {
    queryCount: null,
    pages: 1,
    currentPage: 1,
    filter: {
      limit: 10,
      offset: 0,
      // order: 'ASC',
      // firstName: '',
      // lastName: ''
    }
  }
}

export const newFetch = (newListData, listState) => {
  return {
    ...listState,
    queryCount: newListData.count,
    pages: Math.ceil(newListData.count/listState.filter.limit),
  }
}

export const changePage = (newPageNum, listState) => {
  return {
    ...listState,
    currentPage: newPageNum,
    filter: {
      ...listState.filter,
      offset: (newPageNum - 1) * listState.filter.limit
    }
  }
}

export const deleteItem = (index, list, listState) => {

  const { currentPage, filter, pages } = listState;
  const newList = [...list];
  newList.splice(index, 1);
  console.log(newList.length);
  if( newList.length === 0 && currentPage > 1 ) {
    return {
      list: newList,
      listState: {
        ...listState,
        currentPage: currentPage - 1,
        filter: {
          ...filter,
          offset: (currentPage - 2) * filter.limit
        }
      },
      shouldRefetch: true
    }
  }
  else if ( currentPage === pages ) {
    return {
      list: newList,
      listState,
      shouldRefetch: false
    }
  }
  else {
    return {
      list: newList,
      listState,
      shouldRefetch: true
    }
  }
}
