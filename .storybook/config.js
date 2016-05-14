import { configure } from '@kadira/storybook';

import '../static/css/paper.bootstrap.min.css';

import { disable } from 'react-komposer';

disable(); // Disable composers

function loadStories() {
  require('../src/components/.stories/');
}

configure(loadStories, module);
