'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Funnel } = require('broccoli-funnel');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Import the calcite CSS into the app CSS
  app.import('node_modules/@esri/calcite-components/dist/calcite/calcite.css');

  // Funnel the calcite static assets into the build assets directory
  let calciteAssetsTree = new Funnel(
    './node_modules/@esri/calcite-components/dist',
    {
      srcDir: '/',
      include: ['calcite/assets/**'],
      destDir: '/assets',
    }
  );

  return app.toTree([calciteAssetsTree]);
};
