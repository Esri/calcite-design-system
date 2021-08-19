module.exports = {
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-knobs",
    "@storybook/addon-a11y",
    "@whitespace/storybook-addon-html",
    "storybook-rtl-addon",
    "storybook-addon-themes"
  ],
  stories: ["../src/**/*.stories.@(mdx|ts)"]
};
