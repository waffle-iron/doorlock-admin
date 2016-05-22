import React from 'react';
import MemberForm from '../member.form/MemberForm';
import { storiesOf, action } from '@kadira/storybook';
import CenterModule from './CenterModule';

storiesOf('Member.Form', module)
  .add('Add member', () => {
    const props = {
      submit: action('Form submitted'),
      actions: {
        scanCard: action('Scan new studentCardId')
      },
      studentIdProps: {
        isLoading: false,
      }
    }
    return <CenterModule width={800} bgColor='#FFF'><MemberForm {...props} /></CenterModule>
  })
  .add('Add member, card loading', () => {
    const props = {
      submit: action('Form submitted'),
      actions: {
        scanCard: action('Scan new studentCardId')
      },
      studentIdProps: {
        isLoading: true,
      }
    }
    return <CenterModule width={800} bgColor='#FFF'><MemberForm {...props} /></CenterModule>
  })
  .add('Edit member', () => {
    const props = {
      changeMode: true,
      submit: action('Form submitted'),
      actions: {
        scanCard: action('Scan new studentCardId')
      },
      studentIdProps: {
        isLoading: false,
        studId: '242342342'
      },
      defaultValues: {
        firstName: 'Ole-Andreas',
        lastName: 'Nylund',
        userName: 'ony008',
        graduationYear: 2017,
        privateEmail: 'ole@gmail.com',
        mobile: '48222233',
        studentCardId: 'e32423424'
      }
    }

    return <CenterModule width={800} bgColor='#FFF'><MemberForm {...props}/></CenterModule>
  })
  .add('Edit member loading', () => {
    const props = {
      changeMode: true,
      isLoading: true,
      submit: action('Form submitted'),
      actions: {
        scanCard: action('Scan new studentCardId')
      },
      studentIdProps: {
        isLoading: false,
        studId: '242342342'
      },
      defaultValues: {
        firstName: 'Ole-Andreas',
        lastName: 'Nylund',
        userName: 'ony008',
        privateEmail: 'ole@gmail.com',
        graduationYear: 2017,
        mobile: '48222233',
        studentCardId: 'e32423424'
      }
    }

    return <CenterModule width={800} bgColor='#FFF'><MemberForm {...props}/></CenterModule>
  });
