#!/usr/bin/env bash
set -o errexit

if [ "$BRANCH" = "dev" ] && [ "$NEXT_RELEASE_ENABLED" != "true" ]; then
    echo "Next release is disabled"
    exit 0
fi

npm install

if [ "$BRANCH" = "dev" ] && ! npm run util:is-next-deployable; then
    echo "No deployable changes on dev"
    exit 0
fi

git config --global user.email "github-actions[bot]@users.noreply.github.com"
git config --global user.name "github-actions[bot]"

# version the packages with lerna before building to ensure the version in
# Calcite components' source code preamble is correct for deployment
if [ "$BRANCH" = "dev" ]; then
    npm run version:next
elif [ "$BRANCH" = "rc" ]; then
    npm run version:rc
else
    echo "Prereleases are only deployable from the 'dev' and 'rc' branches."
    exit 1
fi

npm run build
npm test

if [ "$BRANCH" = "rc" ]; then
    npm run publish:rc
elif [ "$BRANCH" = "dev" ]; then
    {
      # storybook publishing uses different URL because it needs additional privileges, we restore it afterwards
      previous_origin_url=$(git remote get-url origin)
      git remote set-url origin "https://${GH_TOKEN_FOR_STORYBOOK}@github.com/${GITHUB_REPOSITORY}.git"

      # try deploying storybook, but still release next if it fails with "|| true"
      { npm run --workspace=@esri/calcite-components build-storybook &&
          npm run --workspace=@esri/calcite-components gh-pages --dist docs --branch gh-pages --message "chore: deploy storybook" --no-history;
      } || true

      # remove the built docs after storybook deploys to gh-pages
      git reset --hard

      git remote set-url origin "$previous_origin_url"
    }

    npm run publish:next
fi

npm run util:push-tags
