import { create } from '@storybook/theming';
import logo from "./logo.svg";

export default create({
  base: 'light',
  brandTitle: 'Calcite Components',
  brandUrl: './',
  brandImage: logo,
  addonNotesTheme: {
    code: {
      whiteSpace: 'normal !important',
    },
    pre: {
      code: {
        whiteSpace: 'pre !important'
      }
    }
  }
});