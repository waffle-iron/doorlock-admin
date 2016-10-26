import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchField from '../components/reusable.search.field/SearchField.jsx'
import { filterMemberPageList } from '../actions/entitiesActions'

const SearchMemberNames = connect(
  (state) => {
    return {
      startValue: state.pagination.members.filter.fullName
    }
  },
  (dispatch) => ({
    onChange: (filter) => dispatch(filterMemberPageList({ fullName: filter }))
  }),
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
      placeholder: 'Søk på navn...'
    })
  }
)(SearchField)

export default SearchMemberNames;
