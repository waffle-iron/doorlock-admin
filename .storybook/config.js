import { configure, addDecorator } from '@kadira/storybook';
import centerDecorator from './decorators/centerDecorator';

import '!style!css!../static/css/paper.bootstrap.min.css';
import '!style!css!../static/css/font-awesome.min.css';

const req = require.context('../src/components', true, /.story.jsx?$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator(centerDecorator)

configure(loadStories, module);
