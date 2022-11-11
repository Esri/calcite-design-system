module.exports = {
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-knobs",
    "@storybook/addon-a11y",
    "@whitespace/storybook-addon-html",
    "storybook-rtl-addon",
    "storybook-addon-themes"
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
