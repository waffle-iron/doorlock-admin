import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import validateMemberForm from './validateMemberForm';
import MemberField from './MemberField.jsx';
import MemberScanCardField from './MemberScanCardField.jsx';
import { Button, ButtonToolbar } from 'react-bootstrap';


const MemberForm = (props) => {
  const { handleSubmit, pristine, invalid, reset, submitting } = props;
  const { title, submitBtnTxt, scanCard } = props;
  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit}>

      <h5 style={{marginBottom:20}}>{ title || 'Legg til medlem' }</h5>

      <Field
        name='firstName'
        component={MemberField}
        type='text'
        label='Fornavn'
      />
      <Field
        name='lastName'
        component={MemberField}
        type='text'
        label='Etternavn'
      />
      <Field
        name='userName'
        component={MemberField}
        type='text'
        label='Brukernavn'
      />
      <Field
        name='graduationYear'
        component={MemberField}
        type='number'
        label='Avgangsår'
      />
      <Field
        name='privateEmail'
        component={MemberField}
        type='email'
        label='Privat e-postadresse'
      />
      <Field
        name='mobile'
        component={MemberField}
        type='tel'
        label='Telefonnummer'
      />
      <Field
        name='studentCardId'
        component={MemberScanCardField}
        label='Studentkortid'
        scanCard={scanCard}
      />

      <ButtonToolbar style={{marginTop:30,marginBottom:20}}>
        <Button
          type='submit'
          bsStyle='primary'
          disabled={pristine || submitting}>{submitBtnTxt || 'Legg til medlem'}</Button>
        <Button
          bsStyle='warning'
          disabled={pristine || submitting}
          onClick={reset}>Tilbakestill</Button>
      </ButtonToolbar>

    </form>
  )
}

const MemberFormWithReduxForm = reduxForm({
  validate: validateMemberForm
})(MemberForm);

export default MemberFormWithReduxForm;
