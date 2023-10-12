import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const regex = {
  references: /(@\w+ "[\w\d.\/]+";)/g,
  media: /(@media\s\([\w-]+:\s\w+\)\s*\{(\s*@include [\w.-]+\(\);)+\s*})/g,
  root: /(:\w+(\(\[[\w-]+="\w+"\]\)){0,1} *\{ *@include [\w.-]+\(\); *\})/g,
  classes: /(\.[\w\d-]+ \{(\s*@include [\w.-]+\(\); *)+\n*\})/g,
};

export function addToIndex(
  name: string,
  prefix: string,
  mode: string,
  outputFileDir: string,
  outputFilePath: string,
  fileHeader: string
): void {
  const indexFilePath = resolve(outputFileDir, "index.scss");
  const indexFileRaw = readFileSync(indexFilePath, { encoding: "utf-8", flag: "a+" });
  const matchExistingReferences = Array.from(indexFileRaw.match(regex.references) || []);
  const matchExistingAtMediaColorSchemes = Array.from(indexFileRaw.match(regex.media) || []);
  const matchExistingClassAndHostRules = Array.from(
    indexFileRaw.match(outputFileDir.includes("mode") ? regex.classes : regex.root) || []
  );
  const includeReferences = []
    .concat(["mixins"], outputFilePath.includes("mode") ? [] : [name.includes("global") ? "global" : "base"])
    .reduce((acc, relFile) => {
      const reference = `@forward "${relFile}";`;
      if (!acc.includes(reference)) {
        acc.push(reference);
      }
      return acc;
    }, matchExistingReferences)
    .sort();
  const includeMedia = [
    ["global", "base"].includes(mode)
      ? undefined
      : `@media (prefers-color-scheme: ${mode}) { @include mixins.${name}(); }`,
  ].reduce((acc, prefersColorScheme) => {
    if (prefersColorScheme) {
      const mediaSelectorToUpdate = acc.findIndex((colorScheme) =>
        colorScheme.includes(`prefers-color-scheme: ${mode}`)
      );

      if (mediaSelectorToUpdate === -1) {
        acc.push(prefersColorScheme);
      } else {
        acc[mediaSelectorToUpdate] = prefersColorScheme;
      }
    }

    return acc;
  }, matchExistingAtMediaColorSchemes);
  const includeClassAndHostRules = (
    name.includes("global")
      ? [`:root { @include mixins.${name}(); }`]
      : outputFileDir.includes("mode")
      ? [`.${prefix}-theme-${mode} { @include mixins.${name}(); }`]
      : mode === "base"
      ? [`:host { @include mixins.${name}(); }`]
      : [`:host([${prefix}-theme="${mode}"]) { @include mixins.${name}(); }`]
  ).reduce((acc, rule) => {
    const ruleToUpdate = acc.findIndex((s) => s.includes(rule));

    if (ruleToUpdate === -1) {
      acc.push(rule);
    } else {
      acc[ruleToUpdate] = rule;
    }

    return acc;
  }, matchExistingClassAndHostRules);

  writeFileSync(
    indexFilePath,
    fileHeader +
      [
        includeReferences.filter((r) => r).join("\n"),
        includeMedia.length > 0 ? includeMedia.join("\n") : undefined,
        includeClassAndHostRules.join("\n"),
      ]
        .filter((i) => i)
        .join("\n\n")
  );
}
