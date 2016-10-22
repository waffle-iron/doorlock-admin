import React from 'react';
import NavBar from './NavBar';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('NavBar', module)
  .add('standard', () => (<NavBar />) );
