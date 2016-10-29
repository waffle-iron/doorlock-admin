import React from 'react';
import LoginForm from '../login/LoginForm';
import { storiesOf, action } from '@kadira/storybook';
import { containerWidth, withRedux } from 'storybook-decorators';
import { withKnobs, text } from '@kadira/storybook-addon-knobs';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { SubmissionError } from 'redux-form';
import Promise from 'bluebird';

const store = createStore(
  combineReducers({
    form: formReducer
  }),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)

const submit = (credentials) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (credentials.username !== 'ole') {
        reject(new SubmissionError({
          username: 'Brukernavn finnes ikke',
          _error: 'Ikke godkjent'
        }));
      } else if (credentials.userpass !== '1234') {
        reject(new SubmissionError({
          userpass: 'Passordet er feil',
          _error: 'Ikke godkjent'
        }));
      } else {
        console.log(credentials);
        action('LoginOk')(credentials);
        resolve();
      }
    }, 1000) // simulate server latency
  })
}

storiesOf('LoginForm', module)
  .addDecorator(withKnobs)
  .addDecorator(withRedux(store))
  .add('user: ole, pass: 1234', () => (<LoginForm onSubmit={submit} />));
