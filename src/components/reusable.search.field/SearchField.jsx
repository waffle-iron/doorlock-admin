import React, { PropTypes } from 'react'
import styles from './SearchField-style.scss'
import { Glyphicon } from 'react-bootstrap'

const SearchField = ({ placeholder, onChange }) => (
  <div className={styles.container}>
    <span className="glyphicon glyphicon-search" />
    <input
      type='search'
      placeholder={placeholder || 'Filter...'}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
)

SearchField.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default SearchField;