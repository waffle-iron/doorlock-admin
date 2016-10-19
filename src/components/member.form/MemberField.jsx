import React, { PropTypes } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock } from 'react-bootstrap';

const MemberField = ({ input, placeholder, label, type, meta }) => {
  const { touched, dirty, error, submitting } = meta;
  const validationStyle = error && touched ? 'error'
    : dirty && touched ? 'success' : null;

  return (
    <FormGroup controlId={input.name} validationState={validationStyle}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...input}
        placeholder={placeholder || label}
        disabled={submitting}
        type={type} />
      <FormControl.Feedback />
      {touched && error &&
        <HelpBlock>{error}</HelpBlock> }
    </FormGroup>
  )
}

export default MemberField;
