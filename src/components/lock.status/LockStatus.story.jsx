import React from 'react';
import LockStatus from './LockStatus';
import { storiesOf, action, linkTo } from '@kadira/storybook';

storiesOf('LockStatus', module)
  .add('locked', () => {
    const props = {
      isLocked: true,
      isLoading: false,
      lockBtnClick: linkTo('LockStatus', 'open')
    }
    return (<LockStatus {...props} />)
  })
  .add('open', () => {
    const props = {
      isLocked: false,
      isLoading: false,
      lockBtnClick: linkTo('LockStatus', 'locked')
    }
    return (<LockStatus {...props} />)
  })
  .add('waiting for btn ack', () => {
    const props = {
      isLocked: false,
      isLoading: false,
      lockBtnClick: linkTo('LockStatus', 'locked'),
      lockBtnDisabled: true
    }
    return (<LockStatus {...props} />)
  })
  .add('loading', () => {
    const props = {
      isLocked: false,
      isLoading: true
    }
    return (<LockStatus {...props} />)
  });
