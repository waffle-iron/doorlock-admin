import React from 'react';
import LockStatus from './LockStatus';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import CenterModule from '../.stories/CenterModule.jsx';

storiesOf('LockStatus', module)
  .add('locked', () => {
    const props = {
      isLocked: true,
      isLoading: false,
      lockBtnClick: linkTo('LockStatus', 'open')
    }
    return <CenterModule width={800} bgColor='#FFF'><LockStatus {...props} /></CenterModule>
  })
  .add('open', () => {
    const props = {
      isLocked: false,
      isLoading: false,
      lockBtnClick: linkTo('LockStatus', 'locked')
    }
    return <CenterModule width={800} bgColor='#FFF'><LockStatus {...props} /></CenterModule>
  })
  .add('waiting for btn ack', () => {
    const props = {
      isLocked: false,
      isLoading: false,
      lockBtnClick: linkTo('LockStatus', 'locked'),
      lockBtnDisabled: true
    }
    return <CenterModule width={800} bgColor='#FFF'><LockStatus {...props} /></CenterModule>
  })
  .add('loading', () => {
    const props = {
      isLocked: false,
      isLoading: true
    }
    return <CenterModule width={800} bgColor='#FFF'><LockStatus {...props} /></CenterModule>
  });
