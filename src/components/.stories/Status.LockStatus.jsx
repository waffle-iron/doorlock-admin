import React from 'react';
import LockStatus from '../status.lockstatus/LockStatus';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import CenterModule from './CenterModule';

storiesOf('Status.LockStatus', module)
  .add('locked', () => {
    const props = {
      isLocked: true,
      isLoading: false,
      lockBtnClick: linkTo('Status.LockStatus', 'open')
    }
    return <CenterModule width={800} bgColor='#FFF'><LockStatus {...props} /></CenterModule>
  })
  .add('open', () => {
    const props = {
      isLocked: false,
      isLoading: false,
      lockBtnClick: linkTo('Status.LockStatus', 'locked')
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
