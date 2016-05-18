import React from 'react';
import MemberListItem from '../member.list.item/MemberListItem';
import { storiesOf, action } from '@kadira/storybook';
import CenterModule from './CenterModule';

storiesOf('Member.List.Item', module)
  .add('Member Item', () => {
    const props = {
      onDelete: action('Delete member'),
      name: 'Ole-Andreas Nylund',
      id: 2
    }

    return <CenterModule width={500} bgColor='#FFF'><MemberListItem {...props}/></CenterModule>
  });
