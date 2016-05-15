import React, { PropTypes } from 'react'
import { Input } from 'formsy-react-components';
import { Button } from 'react-bootstrap';

import styles from './AddStudentCardId-style.css';

const AddStudentCardId = ({ actions, studId, isLoading }) => {
  const btnTxt = studId ? 'Scan nytt kort' : 'Scan kort';
  console.log(isLoading);
  return (
    <div className='form-group row'>
      <label className='control-label col-sm-3'>Studentkortid</label>
      <div className='col-sm-9'>
        { studId ? <h5>{studId}</h5> : '' }
        <Button bsStyle='info' onClick={actions.scanCard}
          disabled={isLoading}
          >{ isLoading ? 'Venter på scanning...' : btnTxt }</Button>
      </div>
      <Input type='hidden' name='studentCardId' value={studId} required />
    </div>
  );
}

export default AddStudentCardId;

// TODO: Bug when trying to scan new card twice without changing the other fields.
// No "waiting for scanning..." or any rerender occurs then. Mystical.
