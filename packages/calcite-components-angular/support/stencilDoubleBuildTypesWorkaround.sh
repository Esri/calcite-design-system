#!/usr/bin/env sh

# This script re-builds the Stencil web components if the types aren't generated correctly.
# Workaround for: https://github.com/ionic-team/stencil/issues/3239
#
# The patch needs to run in the prebuild NPM script hook to prevent build errors for the Angular wrapper.

# Only build if the types are not generated correctly
if ! npm --workspace @esri/calcite-components run util:test-types >/dev/null 2>&1; then
    echo "Re-building @esri/calcite-components due to missing or incorrect types"
    # Use --force to prevent reading the cache from the previous build,
    # which will hit since there are (likely) no changes to the source code
    npx turbo run build --filter=@esri/calcite-components --force
fi
