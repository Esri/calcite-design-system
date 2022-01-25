module.exports = {
  projectRepo: "Esri/calcite-components",
  storybookConfigDir: ".storybook",
  storybookStaticDir: "./__docs-temp__",
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
    compareSVGDOM: true,
    minLayoutDimension: 1,
    minLayoutPosition: 1
  },
  excludeRules: [/^Overview/],
  resolution: "1920x1440"
};
