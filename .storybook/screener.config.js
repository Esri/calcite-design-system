module.exports = {
  projectRepo: "Esri/calcite-components",
  storybookConfigDir: ".storybook",
  apiKey: process.env.SCREENER_API_KEY,
  commit: process.env.COMMIT_SHA,
  resolution: "1024x768",
  baseBranch: "master",
  browsers: [
    {
      browserName: "chrome"
    }
  ],
  diffOptions: {
    minLayoutDimension: 1,
    minLayoutPosition: 1
  },
  excludeRules: [/^Overview/, /No Test$/],
  resolution: "1920x1440"
};
