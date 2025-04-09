#!/usr/bin/env bash

# Remove unnecessary files that ended up in dist before publishing to NPM.
# This is a temporary workaround until I figure out why they are being bundled.
#
# The images in the demos folder first appeared in the dist in v1.4.0 after this PR:
# https://github.com/Esri/calcite-design-system/pull/6873
#
# The rest of the files showed up in v2 and are likely related to the Stencil v4 bump.
rm -rf ./dist/collection/demos ./dist/collection/tests ./dist/.storybook/ \
    ./dist/tailwind.config.js{,.map} ./dist/stencil.config.js{,.map} \
    ./dist/types/tests ./dist/types/home
