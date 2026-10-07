#!/usr/bin/env bash
set -euo pipefail

# Preparation has no npm credentials and makes no remote release writes.
node .github/scripts/prerelease.mjs prepare
