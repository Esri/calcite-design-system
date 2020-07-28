module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.ts$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader"),
        options: {
          configFileName: "tsconfig-storybook.json"
        }
      }
    ]
  });
  config.resolve.extensions.push(".ts");
  return config;
};
