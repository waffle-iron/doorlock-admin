import React from 'react';
import LockStatus from './LockStatus';
import { storiesOf } from '@kadira/storybook';
import { action, decorateAction } from '@kadira/storybook-addon-actions'
import { containerWidth } from 'storybook-decorators';
import { withKnobs, boolean, number } from '@kadira/storybook-addon-knobs';

const firstArgAction = decorateAction([
  (args) => args.slice(0, 1)
]);

storiesOf('LockStatus', module)
  .addDecorator(containerWidth(500))
  .addDecorator(withKnobs)
  .add('locked', () => {
    const props = {
      isLocked: boolean('isLocked', true),
      isLoading: boolean('isLoading', false),
      lockBtnClick: firstArgAction('lockBtnClick'),
      lockBtnDisabled: boolean('lockBtnDisabled', false)
    }
    return (<LockStatus {...props} />)
  });
