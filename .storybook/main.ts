module.exports = {
  addons: [
    "@storybook/addon-backgrounds/register",
    "@storybook/addon-knobs/register",
    "@storybook/addon-notes/register-panel",
    "@storybook/addon-a11y/register"
  ],
  presets: ["@storybook/addon-docs/preset"],
  stories: ["../src/**/*.stories.(mdx|ts)"]
};
