import { configure, addParameters, addDecorator } from '@storybook/html';
import centered from '@storybook/addon-centered/html';

addDecorator(centered);
addParameters({
  backgrounds: [
    { name: 'Light', value: '#f8f8f8', default: true },
    { name: 'Dark', value: '#202020' }
  ]
});
configure(require.context('../src/components', true, /\.stories\.js$/), module);
