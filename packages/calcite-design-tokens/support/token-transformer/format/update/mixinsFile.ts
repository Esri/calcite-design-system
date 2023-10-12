import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { default as StyleDictionary } from "style-dictionary";
import { Dictionary } from "style-dictionary/types/Dictionary";

export function addToMixins(
  name: string,
  outputFileDir: string,
  dictionary: Dictionary,
  outputReferences: boolean,
  fileHeader: string
): void {
  const mixinFilePath = resolve(outputFileDir, "mixins.scss");
  const mixinFileRaw = readFileSync(mixinFilePath, { encoding: "utf-8", flag: "a+" });
  const mixinMatches = Array.from(
    mixinFileRaw.match(/(@mixin [\w\d-]+\(\) *{\n*([ \w\d-.\(\):,#\%\*]*;(\s\/\*[ \w\d-.\(\)]+\*\/*)*\n*)* *\})/g) || []
  );
  const newMixinStr =
    `@mixin ${name}() {` +
    "\n" +
    StyleDictionary.formatHelpers
      .formattedVariables({ format: "css", dictionary, outputReferences })
      .split("\n")
      .filter((variable) => !variable.includes("[object Object]"))
      .join("\n") +
    "\n" +
    "}";
  const mixinFileArray = [];
  let mixinReplaced = false;

  mixinMatches.forEach((mixin) => {
    if (mixin.includes(`@mixin ${name}()`)) {
      mixinFileArray.push(newMixinStr);
      mixinReplaced = true;
    } else {
      mixinFileArray.push(mixin);
    }
  });

  if (!mixinReplaced) {
    mixinFileArray.push(newMixinStr);
  }

  writeFileSync(mixinFilePath, fileHeader + mixinFileArray.join("\n\n"));
}
