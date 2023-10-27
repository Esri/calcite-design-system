#!/usr/bin/env sh

# This script re-builds the stencil web components if the
# types aren't generated correctly as a workaround for
# https://github.com/ionic-team/stencil/issues/3239
#
# It runs in the prebuild NPM script hook to prevent
# the Angular wrapper from throwing build errors.

# Only build if the types are not generated correctly
! npm --workspace @esri/calcite-components run util:test-types &&
    # Use --force to prevent reading the cache from the previous build,
    # which will hit since there are (likely) no changes to the source code
    npx turbo run build --filter=@esri/calcite-components --force ||
    # Don't fail the build if calcite-components types were already generated correctly
    true
