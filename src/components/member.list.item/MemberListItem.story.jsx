import React from 'react';
import MemberListItem from './MemberListItem';
import { containerWidth } from 'storybook-decorators';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, number } from '@kadira/storybook-addon-knobs';

storiesOf('MemberListItem', module)
  .addDecorator(containerWidth(500))
  .addDecorator(withKnobs)
  .add('Member Item', () => {
    const props = {
      onDelete: action('Delete member'),
      name: text('name', 'Ole-Andreas Nylund'),
      id: 2
    }

    return (<MemberListItem {...props}/>)
  });
