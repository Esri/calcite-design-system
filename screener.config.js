var Steps = require('screener-runner/src/steps');

module.exports = {
  // full repository name for your project:
  projectRepo: 'Esri/calcite-components',

  // this example assumes Environment Variables listed below exist on your system:
  apiKey: '1817834e-8791-4606-a9f0-6c164f21b1ec',

  // array of UI states to capture visual snapshots of.
  // each state consists of a url and a name.
  states: [
    {
      url: 'http://localhost:3333/demos/calcite-radio-button.html',
      name: 'calcite-radio-button',
      steps: new Steps().snapshot('Default').end()
    }
  ]
};