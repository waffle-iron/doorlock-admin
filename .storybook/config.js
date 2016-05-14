import { configure } from '@kadira/storybook';
// import styles here
import { disable } from 'react-komposer';

disable(); // Disable composers

function loadStories() {
  require('./src/components/.stories/');
}

configure(loadStories, module);
