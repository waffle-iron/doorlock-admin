import React from 'react';
import MemberListItem from './MemberListItem';
import { storiesOf, action } from '@kadira/storybook';
import CenterModule from '../.stories/CenterModule.jsx';

storiesOf('MemberListItem', module)
  .add('Member Item', () => {
    const props = {
      onDelete: action('Delete member'),
      name: 'Ole-Andreas Nylund',
      id: 2
    }

    return <CenterModule width={500} bgColor='#FFF'><MemberListItem {...props}/></CenterModule>
  });
