#!/usr/bin/env sh

# This script re-builds the stencil web components if the
# types aren't generated correctly as a workaround for
# https://github.com/ionic-team/stencil/issues/3239
#
# It runs in the prebuild NPM script hook to prevent
# the Angular wrapper from throwing build errors.

# Only build if the types are not generated correctly
npm --workspace @esri/calcite-components run util:test-types &&
    npm --workspace @esri/calcite-components run build
