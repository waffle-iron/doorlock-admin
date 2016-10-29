import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

import styles from './LoginForm-style.scss';


const LoginField = ({ input, placeholder, type, meta }) => {
  const { touched,error, submitting } = meta;
  const validationStyle = error && touched ? 'error' : null;
  return (
    <FormGroup controlId={input.name} validationState={validationStyle}>
      <FormControl {...input}
        placeholder={placeholder}
        disabled={submitting}
        type={type} />
      {touched && error &&
        <HelpBlock>{error}</HelpBlock> }
    </FormGroup>
  )
}

const validate = (values) => {

  const errors = {}

  if(!values.username) {
    errors.username = 'Påkrevd';
  }

  if(!values.userpass) {
    errors.userpass = 'Påkrevd';
  }

  return errors;
}

const LoginForm = ({ handleSubmit, submitting, pristine, error }) => (
  <div className={styles.box}>
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Hackerspace UI</legend>
        <div className={styles.content}>
          <Field
            name='username'
            type='text'
            component={LoginField}
            placeholder='Brukernavn'
          />

          <Field
            name='userpass'
            type='password'
            component={LoginField}
            placeholder='Passord'
          />

          <Button
            type='submit'
            disabled={submitting || pristine}
            bsStyle='primary'
            block
            >Logg inn</Button>
        </div>
      </fieldset>
    </form>
    { error && <p>{error}</p> }
  </div>
)

const LoginFormWithReduxForm = reduxForm({
  form: 'loginForm',
  validate
})(LoginForm);

export default LoginFormWithReduxForm;
