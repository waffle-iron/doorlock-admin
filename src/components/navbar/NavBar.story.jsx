import React from 'react';
import NavBar from './Navbar';
import { storiesOf, action } from '@kadira/storybook';
import CenterModule from '../.stories/CenterModule.jsx';

storiesOf('NavBar', module)
  .add('standard', () => {
    return <CenterModule width={800} bgColor='#FFF'><NavBar /></CenterModule>
  });
