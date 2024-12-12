#!/usr/bin/env bash

# find the directory this script lives in and cd to its parent (the package root)
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
cd "$(dirname "$SCRIPT_DIR")" || exit

# remove and remake the intermediary font-icons directories
rm -rf font-icons/
mkdir -p font-icons/16/ font-icons/24/ font-icons/32/

# filter out icons with opacity and create hardlinks in the intermediary directory
grep -LF opacity icons/*.svg | xargs -I{} ln {} font-icons/

cd font-icons || exit

# separate the icons into subdirectories by size and remove the size from the filenames
for file in ./*-16{-f,}.svg; do mv "$file" "16/${file/-16/}"; done
for file in ./*-24{-f,}.svg; do mv "$file" "24/${file/-24/}"; done
for file in ./*-32{-f,}.svg; do mv "$file" "32/${file/-32/}"; done

cd .. || exit

# create a separate font file for each icon size
fantasticon font-icons/16/ -n calcite-ui-icons-16 --normalize true -t ttf -g json -o fonts/
fantasticon font-icons/24/ -n calcite-ui-icons-24 --normalize true -t ttf -g json -o fonts/
fantasticon font-icons/32/ -n calcite-ui-icons-32 --normalize true -t ttf -g json -o fonts/
