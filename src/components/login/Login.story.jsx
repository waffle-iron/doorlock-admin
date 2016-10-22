import React from 'react';
import Login from '../login/Login';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Login', module)
  .add('Login admin', () => {
    const props = {
      submit: action('Form submitted')
    }
    return (<Login {...props} />)
  });
