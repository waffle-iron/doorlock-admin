import { configure } from '@kadira/storybook';

import '!style!css!../static/css/paper.bootstrap.min.css';
import '!style!css!../static/css/font-awesome.min.css';

function loadStories() {
  require('../src/components/.stories/');
}

configure(loadStories, module);
