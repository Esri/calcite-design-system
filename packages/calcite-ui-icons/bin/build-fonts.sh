#!/usr/bin/env bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
cd "$(dirname "$SCRIPT_DIR")" || exit

# remove previous build and remake directories
rm -rf font-icons/
mkdir -p font-icons/16/ font-icons/24/ font-icons/32/

# filter out icons with opacity and create a symlink
grep -LF opacity icons/*.svg | xargs -I{} ln {} font-icons/

cd font-icons || exit

# separate the fonts into subdirectories by size
for file in ./*-16{-f,}.svg; do mv "$file" "16/${file/-16/}"; done
for file in ./*-24{-f,}.svg; do mv "$file" "24/${file/-24/}"; done
for file in ./*-32{-f,}.svg; do mv "$file" "32/${file/-32/}"; done

cd ..

fantasticon font-icons/16/ -n calcite-ui-icons-16 --normalize true -t ttf -g json -o fonts/
fantasticon font-icons/24/ -n calcite-ui-icons-24 --normalize true -t ttf -g json -o fonts/
fantasticon font-icons/32/ -n calcite-ui-icons-32 --normalize true -t ttf -g json -o fonts/
