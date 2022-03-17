module.exports = {
  projectRepo: "Esri/calcite-components",
  storybookConfigDir: ".storybook",
  storybookStaticDir: "./__docs-temp__",
  apiKey: process.env.SCREENER_API_KEY,
  commit: process.env.COMMIT_SHA,
  baseBranch: "master",
  browsers: [
    {
      browserName: "chrome",
      version: "97.0"
    }
  ],
  diffOptions: {
    minLayoutDimension: 1,
    minLayoutPosition: 1
  },
  sauce: {
    username: process.env.SAUCE_ACCESS_NAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    maxConcurrent: 10
  },
  excludeRules: [/^Overview/],
  resolution: "1024x768",
  failureExitCode: 0,
  failOnNewStates: false
};
