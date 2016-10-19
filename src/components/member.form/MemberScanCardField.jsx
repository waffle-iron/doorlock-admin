import React, { PropTypes } from 'react';
import {
  Button,
  Glyphicon,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock } from 'react-bootstrap';


const MemberScanCardField = ({ input, scanCard, label, type, meta }) => {
  const { touched, dirty, error, submitting } = meta;
  const btnTxt = input.value ? 'Scan nytt kort' : 'Scan kort';
  const errorStateCondition = error && touched && !scanCard.isLoading
  const validationStyle = errorStateCondition ? 'error'
  : dirty ? 'success' : null;
  const glyphType = error ? 'remove' : 'ok';

  return (
    <FormGroup controlId={input.name} validationState={validationStyle}>
      <ControlLabel>{label}{' '}{ touched && !scanCard.isLoading && <Glyphicon glyph={glyphType} /> }</ControlLabel>
      { input.value && <h5>{input.value}</h5> }
      <div>
        <Button bsStyle='info' onClick={scanCard.click}
          onBlur={input.onBlur.bind(null, input.value)}
          onFocus={input.onFocus}
          disabled={scanCard.isLoading || submitting}
          title='Trykk på knappen, scan så kortet på døren innen 10 sekunder'
          >{ scanCard.isLoading ? 'Venter på scanning...' : btnTxt }</Button>
      </div>
      { errorStateCondition &&
        <HelpBlock>{error}</HelpBlock> }
        <div style={{marginTop:5,marginBottom:10,color: '#a6a6a6'}} >
          Trykk på knappen, scan så kortet på døren innen 10 sekunder
        </div>
    </FormGroup>
  )
}

export default MemberScanCardField;
