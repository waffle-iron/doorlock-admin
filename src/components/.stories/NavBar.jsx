import React from 'react';
import NavBar from '../navbar/Navbar';
import { storiesOf, action } from '@kadira/storybook';
import CenterModule from './CenterModule';

storiesOf('NavBar', module)
  .add('test', () => {
    return <CenterModule width={350} bgColor='#e6e6e6'><NavBar /></CenterModule>
  });
