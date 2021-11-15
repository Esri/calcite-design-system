const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-knobs",
    "@storybook/addon-a11y",
    "@whitespace/storybook-addon-html",
    "storybook-rtl-addon",
    "storybook-addon-themes"
  ],
  stories: ["../src/**/*.stories.@(mdx|ts)"],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  },
  webpackFinal: (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions
      })
    ];
    return config;
  }
};
