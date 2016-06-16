import React from 'react';
import StatusLog from '../status.loglist/StatusLog';
import { storiesOf, action } from '@kadira/storybook';
import CenterModule from './CenterModule';

storiesOf('Status.StatusLog', module)
  .add('Startup stream log output', () => {
    const props = {
      store: {
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
    }
    return <CenterModule width={800} bgColor='#FFF'><StatusLog {...props} /></CenterModule>
  })
  .add('Long log output', () => {
    const props = {
      store: {
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
    }
    return <CenterModule width={800} bgColor='#FFF'><StatusLog {...props} /></CenterModule>
  });
