import React from 'react';
import MemberListItem from './MemberListItem';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('MemberListItem', module)
  .add('Member Item', () => {
    const props = {
      onDelete: action('Delete member'),
      name: 'Ole-Andreas Nylund',
      id: 2
    }

    return (<MemberListItem {...props}/>)
  });
