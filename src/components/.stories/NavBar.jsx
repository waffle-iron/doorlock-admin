import React from 'react';
import NavBar from '../navbar/Navbar';
import { storiesOf, action } from '@kadira/storybook';
import CenterModule from './CenterModule';

storiesOf('NavBar', module)
  .add('standard', () => {
    return <CenterModule width={800} bgColor='#FFF'><NavBar /></CenterModule>
  });
