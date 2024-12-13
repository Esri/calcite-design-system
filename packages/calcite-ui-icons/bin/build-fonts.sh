#!/usr/bin/env bash

# find the directory this script lives in and cd to its parent (the package root)
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
cd "$(dirname "$SCRIPT_DIR")" || exit

# remove and remake the intermediary font icons directories
rm -rf fonts/icons/
mkdir -p fonts/icons/{16,24,32}/

# filter out icons with opacity and create hardlinks in the intermediary directory
grep -LF opacity icons/*.svg | xargs -I{} ln {} fonts/icons/

cd fonts/icons || exit

# separate the icons into subdirectories by size and remove the size from the filenames
for file in ./*-16{-f,}.svg; do mv "$file" "16/${file/-16/}"; done
for file in ./*-24{-f,}.svg; do mv "$file" "24/${file/-24/}"; done
for file in ./*-32{-f,}.svg; do mv "$file" "32/${file/-32/}"; done

cd ../.. || exit

# create a separate font file for each icon size
fantasticon fonts/icons/16/ -n calcite-ui-icons-16 --normalize true -t ttf -g json -o fonts/
fantasticon fonts/icons/24/ -n calcite-ui-icons-24 --normalize true -t ttf -g json -o fonts/
fantasticon fonts/icons/32/ -n calcite-ui-icons-32 --normalize true -t ttf -g json -o fonts/

# update codepoints in config file
echo "{\"codepoints\": $(cat fonts/calcite-ui-icons-16.json)}" >./fantasticonrc.json
prettier --write ./fantasticonrc.json
