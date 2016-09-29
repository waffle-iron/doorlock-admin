import React from 'react';
import LockLogStream from './LockLogStream.jsx';
import { storiesOf, action } from '@kadira/storybook';
import CenterModule from '../.stories/CenterModule.jsx';

storiesOf('LockLogStream', module)
  .add('Startup stream log output', () => {
    const props = {
      log: '--------------------------------------------\n\
            App started\n\
            Tue Jun 14 2016 19:17:19 GMT+0200 (CEST)\n\
            --------------------------------------------\n\
            User schema synced\n\
            Tue Jun 14 2016 19:17:22 GMT+0200 (CEST)\n\
            --------------------------------------------\n\
            Unauthorized card: 787ddf10\n\
            Tue Jun 14 2016 19:26:24 GMT+0200 (CEST)\n\
            --------------------------------------------\n\
            Unauthorized card: 787ddf10\n\
            Tue Jun 14 2016 19:26:53 GMT+0200 (CEST)\n\
            --------------------------------------------\n'
    }
    return <CenterModule width={800} bgColor='#FFF'><LockLogStream {...props} /></CenterModule>
  })
  .add('Long log output', () => {
    const props = {
      log: '--------------------------------------------\n\
            App started\n\
            Tue Jun 14 2016 19:17:19 GMT+0200 (CEST)\n\
            --------------------------------------------\n\
            User schema synced\n\
            Tue Jun 14 2016 19:17:22 GMT+0200 (CEST)\n\
            --------------------------------------------\n\
            Unauthorized card: 787ddf10\n\
            Tue Jun 14 2016 19:26:24 GMT+0200 (CEST)\n\
            --------------------------------------------\n\
            Unauthorized card: 787ddf10\n\
            Tue Jun 14 2016 19:26:53 GMT+0200 (CEST)\n\
            --------------------------------------------\n\
            User schema synced\n\
            Tue Jun 14 2016 19:17:22 GMT+0200 (CEST)\n\
            --------------------------------------------\n\
            Unauthorized card: 787ddf10\n\
            Tue Jun 14 2016 19:26:24 GMT+0200 (CEST)\n\
            --------------------------------------------\n\
            Unauthorized card: 787ddf10\n\
            Tue Jun 14 2016 19:26:53 GMT+0200 (CEST)\n\
            --------------------------------------------\n'
    }
    return <CenterModule width={800} bgColor='#FFF'><LockLogStream {...props} /></CenterModule>
  });
