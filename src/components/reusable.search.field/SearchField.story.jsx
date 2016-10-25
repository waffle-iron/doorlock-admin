import React from 'react';
import SearchField from './SearchField';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('SearchField', module)
  .add('standard', () => {
    const props = {
      placeholder: 'Søk på navn...',
      onChange: action('onChange')
    }
    return (<SearchField {...props} />)
  });
