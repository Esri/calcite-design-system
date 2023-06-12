import { camelCase, pascalCase, sentenceCase } from "change-case";
import StyleDictionary, { Dictionary, File, Platform, Options } from "style-dictionary";
import { sortAllTokens } from "../utils/sortAllTokens.js";

const regexThemeGroup = /calcite|brand/gi;
const regexFileNameWithoutExtension = /\w+(?=\.\w+$)/gi;

/**
 * Exports SCSS style formats
 * @param {object} fileInfo the file object
 * @param {Dictionary} fileInfo.dictionary the Style Dictionary object
 * @param {File} fileInfo.file information about the file to be generated
 * @param {Platform} [fileInfo.platform] the platform to generate the asset for
 * @param {Options} fileInfo.options the Style Dictionary format options passed from the config
 * @returns {string} a string that is passed to fs.writeFileSync
 */
export function formatSCSS(fileInfo: {
  dictionary: Dictionary;
  file: File;
  platform?: Platform;
  options: Options & { themeable?: boolean };
}): string {
  const { dictionary, file, options } = fileInfo;
  const { outputReferences } = options;
  const themeName = pascalCase(
    sentenceCase(file.destination.match(regexFileNameWithoutExtension)[0])
      .split(" ")
      .filter((n) => !regexThemeGroup.test(n))
      .join(" ")
  ).toLowerCase();
  const sassProps = StyleDictionary.formatHelpers.createPropertyFormatter({
    outputReferences,
    dictionary,
    format: "sass"
  });
  const cssProps = StyleDictionary.formatHelpers.createPropertyFormatter({
    outputReferences,
    dictionary,
    format: "css"
  });
  const sortedTokens = sortAllTokens(dictionary, outputReferences);
  const transformSortedTokens: string[][] = [[], [], [], []];
  const [scssTokens, cssTokens, scssMixins, cssClasses] = [...sortedTokens].reduce((acc, token) => {
    if (outputReferences) {
      // due to the limits of CSS we can only use custom props for full prop values so we'll only use the variable here if the reference is the only value
      if (
        dictionary.usesReference(token.original.value) &&
        token.original.value.slice(0) === "{" &&
        token.original.value.slice(-1) === "}" &&
        !token.original.value.includes(",")
      ) {
        const refs = dictionary.getReferences(token.original.value);
        refs.forEach((ref) => {
          token.value = JSON.stringify(token.original.value).replace(ref.value, `${ref.name}`);
        });
      }
    }

    // Any boxShadow token that ends in a number is part of a multi-shadow property and we can ignore them.
    if (token.attribute.type === "boxShadow" && isNaN(Number(token.path.slice(-1)))) {
      const cssToken = cssProps(token);
      const scssToken = sassProps(token);
      acc[0].push(scssToken);
      acc[1].push(cssToken);
      // Add box-shadow mixin and class
      acc[2].push(`@mixin ${camelCase(token.name)} { box-shadow: var(--${token.name}); }`);
      acc[3].push(`.${token.name} { box-shadow: var(--${token.name}); }`);
    } else if (token.attribute.type !== "boxShadow") {
      acc[0].push(sassProps(token));
      acc[1].push(cssProps(token));
    }

    // if (token.filePath.includes("core")) {
    //   const sassToken = { ...token };
    //   const path = sassToken.path.filter((p) => !/(core|default|font$)/.test(p));
    //   sassToken.name = sassToken.type === "color" ? path.slice(-1).join("-") : path.join("-");
    //   sassToken.original.value = sassToken.original.value[0] === "{" ? sassToken.value : sassToken.original.value;
    //   acc[0].push(sassProps(sassToken));
    // }
    // if (/dark|light/.test(token.filePath) && !token.path.includes("component")) {
    //   const sassToken = { ...token };
    //   const path = sassToken.path.reduce((acc, p) => {
    //     if (p === "default") {
    //       return acc;
    //     }
    //     acc.push(p === "color" ? "ui" : p);
    //     return acc;
    //   }, []);
    //   path.push(token.filePath.includes("dark") ? "dark" : "light");
    //   sassToken.name = path.join("-");
    //   acc[0].push(sassProps(sassToken));
    // }

    return acc;
  }, transformSortedTokens);

  return `${StyleDictionary.formatHelpers.fileHeader({ file })}
${scssTokens.join("\n")}

@mixin calcite-theme-${themeName}() {
${cssTokens.join("\n")}
}

${scssMixins?.join("\n") || ""}
${cssClasses?.join("\n") || ""}
`;
}
