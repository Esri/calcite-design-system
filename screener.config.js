module.exports = {
  projectRepo: 'Esri/calcite-components',
  storybookConfigDir: '.storybook',
  storybookStaticDir: './__docs-temp__',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  browsers: [
    {
      browserName: 'chrome'
    }
  ]
};