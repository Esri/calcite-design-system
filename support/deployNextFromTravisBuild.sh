#!/bin/bash

# this script is meant to be run Travis deploys and determines if there will release-worthy changes.
# based on https://github.com/conventional-changelog/standard-version/issues/192#issuecomment-610494804

function deployable {
  local LOG_START=${1:-HEAD}
  local LOG_END=${2:-HEAD}

  if \
  { git log "${LOG_START}..${LOG_END}" --format='%s' | cut -d: -f1 | sort -u | sed -e 's/([^)]*)//' | grep -q -i -E '^feat|fix$' ; } || \
  { git log "${LOG_START}..${LOG_END}" --format='%s' | cut -d: -f1 | sort -u | sed -e 's/([^)]*)//' | grep -q -E '\!$' ; } || \
  { git log "${LOG_START}..${LOG_END}" --format='%b' | grep -q -E '^BREAKING CHANGE:' ; }
  then
    echo 0 # successful
  fi
}

function latestCommit {
  echo $( git rev-parse $1 )
}

function mostRecentTag {
  echo $( git describe --tags --abbrev=0 $1)
}

echo "Determining build deployability 🔍"

if [ ! $( deployable $( mostRecentTag HEAD ) ) ]
then
  echo "No changes since the previous release, skipping ⛔"
else
  git checkout master --quiet && git fetch --quiet >> .npmrc 2> /dev/null

  if [ $( latestCommit master ) != $( latestCommit origin/master) ] && [ $( deployable master origin/master) ]
  then
    echo "Deployment build is outdated, aborting ⛔️"
  else
    echo "Deploying @next from existing build 🚧"

    if \
      { echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" >> .npmrc 2> /dev/null ; } && \
      { \
        echo " - prepping package..." && \
        npm run util:prep-next-from-existing-build >/dev/null 2>&1 && \

        echo " - pushing tags..." && \
        npm run util:push-tags -- --quiet https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG master >/dev/null 2>&1 && \

        echo " - publishing @next..." && \
        npm run util:publish-next >/dev/null 2>&1  \
      ; }
    then
      echo "@next deployed! 🚀"
    else
      echo "An error occurred during deployment ❌"
    fi
  fi
fi
