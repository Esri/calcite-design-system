import { configure, addParameters, addDecorator } from '@storybook/html';
import centered from '@storybook/addon-centered/html';
import theme from './theme';

addDecorator(centered);
addParameters({
  backgrounds: [
    { name: 'Light', value: '#f8f8f8', default: true }
  ],
  options: {
    theme,
     isToolshown: false,
  }
});

configure(require.context('../src/components', true, /\.stories\.js$/), module);