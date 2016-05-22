import { configure } from '@kadira/storybook';

import '!style-loader!css-loader!../static/css/paper.bootstrap.min.css';
import '!style-loader!css-loader!../static/css/font-awesome.min.css';

function loadStories() {
  require('../src/components/.stories/');
}

configure(loadStories, module);
