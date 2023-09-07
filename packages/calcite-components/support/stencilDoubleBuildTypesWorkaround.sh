#!/usr/bin/env sh

# This script builds the stencil components and ensures
# the types are generated correctly as a workaround for
# https://github.com/ionic-team/stencil/issues/3239
#
# It runs in the prepublishOnly NPM script hook
# to prevent releasing with type bugs, and because
# it needs to execute after versioning so that the
# preamble in the dist source code is correct.
#
# Refs:
# https://github.com/lerna/lerna/blob/main/libs/commands/publish/README.md#lifecycle-scripts
# https://docs.npmjs.com/cli/v8/using-npm/scripts#life-cycle-scripts
# https://github.com/Esri/calcite-design-system/pull/4303

# The vscode data is not being generated if the file already exists
rimraf dist/extras/vscode-data.json
npm run build
npm run util:test-types
