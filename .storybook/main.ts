module.exports = {
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-knobs",
    "@storybook/testing-library",
    "@whitespace/storybook-addon-html",
    "storybook-addon-themes",
    "storybook-rtl-addon"
  ],
  staticDirs: ["../__docs-temp__"],
  stories: ["../src/**/*.stories.@(mdx|ts)"],
  babel: async (options) => {
    return {
      ...options,
      presets: [
        ...options.presets,

        // we need to set this up to enable custom Storybook doc components
        // https://storybook.js.org/docs/html/writing-docs/docs-page#with-a-custom-component
        "@babel/preset-react"
      ]
    };
  }
};
