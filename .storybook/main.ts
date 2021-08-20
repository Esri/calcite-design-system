module.exports = {
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-backgrounds",
    "@storybook/addon-knobs",
    "@storybook/addon-a11y",
    "@whitespace/storybook-addon-html"
  ],
  stories: ["../src/**/*.stories.@(mdx|ts)"],
  typescript: {
    reactDocgen: false
  }
};
