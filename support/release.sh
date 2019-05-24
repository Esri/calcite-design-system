# get the version from package.json
VERSION=$(node --eval "console.log(require('./package.json').version);")

# commit the changes from `npm run release:prepare`
git add --all
git commit -am "v$VERSION" --no-verify

# push everything up to this point to master
git push https://github.com/ArcGIS/calcite-components.git master

# push the new tag, not the old tags
git push https://github.com/ArcGIS/calcite-components.git v$VERSION

# create a ZIP archive of the dist files
TEMP_FOLDER=calcite-components-v$VERSION;
mv dist $TEMP_FOLDER
zip -r $TEMP_FOLDER.zip $TEMP_FOLDER
rm -rf $TEMP_FOLDER

# Run gh-release to create a new release with our changelog changes and ZIP archive
gh-release --t v$VERSION --repo calcite-components --owner ArcGIS -a $TEMP_FOLDER.zip

# Delete the ZIP archive
rm $TEMP_FOLDER.zip
