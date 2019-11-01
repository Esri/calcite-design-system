import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);

function createAlert (d) {
  const el = d.createElement('calcite-alert');

  const title = d.createElement('div');
  title.slot = 'alert-title';
  title.innerHTML = 'Alert title';
  el.appendChild(title);

  const message = d.createElement('div');
  message.slot = 'alert-message';
  message.innerHTML = 'Alert message';
  el.appendChild(message);

  const button = d.createElement('calcite-button');
  button.slot = 'alert-link';
  button.appearance = 'inline';
  button.innerHTML = 'Alert link';
  el.appendChild(button);

  return el;
}

storiesOf('Alerts', module)
  .addDecorator(withKnobs)
  .add('Single alert', () => {
    const el = createAlert(document);
    el.color = select('color', {blue: 'blue', green: 'green', red: 'red', yellow: 'yellow'}, 'blue');
    el.icon = boolean('icon', false);
    el.dismiss = boolean('dismiss', false);
    el.duration = select('duration', {fast: 'fast', medium: 'medium', slow: 'slow'}, 'medium');
    setTimeout(function () {
      el.setAttribute('active', true);
    }, 200);
    return el;
  }, { notes })
  .add('Dark mode', () => {
    const el = createAlert(document);
    el.color = select('color', {blue: 'blue', green: 'green', red: 'red', yellow: 'yellow'}, 'blue');
    el.icon = boolean('icon', false);
    el.dismiss = boolean('dismiss', false);
    el.duration = select('duration', {fast: 'fast', medium: 'medium', slow: 'slow'}, 'medium');
    el.theme = 'dark';
    setTimeout(function () {
      el.setAttribute('active', true);
    }, 200);
    return el;
  }, { notes, backgrounds: darkBackground });
