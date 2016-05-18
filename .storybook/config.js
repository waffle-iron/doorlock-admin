import { configure } from '@kadira/storybook';

import '!style-loader!css-loader!../static/css/paper.bootstrap.min.css';
import '!style-loader!css-loader!../static/css/font-awesome.min.css';

import { disable } from 'react-komposer';

disable(); // Disable composers

function loadStories() {
  require('../src/components/.stories/');
}

configure(loadStories, module);
