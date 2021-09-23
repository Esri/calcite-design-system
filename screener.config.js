module.exports = {
  projectRepo: "Esri/calcite-components",
  storybookConfigDir: ".storybook",
  storybookStaticDir: "./__docs-temp__",
  apiKey: process.env.SCREENER_API_KEY,
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
  failureExitCode: 0,
  includeRules: [/Components\/Popover/, /Components\/Tooltip/]
};
