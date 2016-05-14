import React from 'react';
import MemberForm from '../member.form/MemberForm';
import { storiesOf, action } from '@kadira/storybook';
import CenterModule from './CenterModule';

storiesOf('Member.Form', module)
  .add('Add member', () => {
    const props = {
      submit: action('Form submitted')
    }
    return <CenterModule width={800} bgColor='#FFF'><MemberForm {...props} /></CenterModule>
  })
  .add('Edit member', () => {
    const props = {
      submit: action('Form submitted'),
      editMember: {
        firstName: 'Ole-Andreas',
        lastName: 'Nylund',
        userName: 'ony008',
        privateEmail: 'ole@gmail.com',
        mobile: '48222233'
      }
    }

    return <CenterModule width={800} bgColor='#FFF'><MemberForm {...props}/></CenterModule>
  });
