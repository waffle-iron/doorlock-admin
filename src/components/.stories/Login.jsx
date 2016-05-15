import React from 'react';
import Login from '../login/Login';
import { storiesOf, action } from '@kadira/storybook';
import CenterModule from './CenterModule';

storiesOf('Login', module)
  .add('Login admin', () => {
    const props = {
      submit: action('Form submitted')
    }
    return <CenterModule width={800} bgColor='#FFF'><Login {...props} /></CenterModule>
  });
