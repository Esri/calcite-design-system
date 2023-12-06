#!/usr/bin/env sh

# This runs in the prepublishOnly NPM script hook after versioning
# so that the preamble in the dist source code is correct.
#
# Refs:
# https://github.com/lerna/lerna/blob/main/libs/commands/publish/README.md#lifecycle-scripts
# https://docs.npmjs.com/cli/v8/using-npm/scripts#life-cycle-scripts
# https://github.com/Esri/calcite-design-system/pull/4303

# The vscode data is not being generated if the file already exists
rimraf dist/extras/vscode-data.json
npm run build
npm run util:test-types
