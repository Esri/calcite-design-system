import { camelCase, paramCase, pascalCase, sentenceCase } from "change-case";
import StyleDictionary, { Dictionary, File, Platform, Options } from "style-dictionary";
import { sortAllTokens } from "../utils/sortAllTokens.js";
import { makeCSSProp } from "../utils/makeCSSProp.js";
import { makeSCSSVar } from "../utils/makeSCSSVar.js";
import { DesignToken } from "style-dictionary/types/DesignToken.js";

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

  const getReferenceValue = (token: DesignToken | string): string | DesignToken | DesignToken[] => {
    try {
      const val = typeof token["value"] === "string" || typeof token["value"] === "number" ? token["value"] : token;
      if (dictionary.usesReference(val)) {
        // getReferences provided by Token Studio does not support a
        const refs = dictionary.getReferences(val);
        if (refs) {
          return refs.reduce((acc, ref) => {
            if (typeof ref === "object" && dictionary.usesReference(ref.original.value)) {
              ref.attributes.usesReferences = true;
              if (typeof ref.value === "object") {
                ref.attributes.composite = true;
                return ref;
              }

              return getReferenceValue(ref.original);
            } else {
              acc.push(ref);
            }
            return acc;
          }, []);
        }
      } else {
        return token;
      }
    } catch (error) {}
  };
  const sortedTokens = sortAllTokens(dictionary, outputReferences);
  const transformTokens: string[][] = [[], [], [], []];
  const [scssTokens, cssTokens, scssMixins, cssClasses] = [...sortedTokens].reduce((acc, token) => {
    const val = getReferenceValue(token.original);
    const values = Array.isArray(val) ? val : [val];
    values.forEach((referenceToken) => {
      if (typeof referenceToken === "object" && referenceToken.name && outputReferences === true) {
        const refCSSProp = makeCSSProp(referenceToken.name);
        const refSCSSProp = makeSCSSVar(referenceToken.name);

        const scssIdx = acc[0].findIndex((t) => t.includes(refSCSSProp));
        const cssIdx = acc[1].findIndex((t) => t.includes(refCSSProp));

        if (scssIdx === -1) {
          acc[0].push(`${refSCSSProp}: ${referenceToken.value}`);
        }
        if (cssIdx === -1) {
          acc[1].push(`${refCSSProp}: ${referenceToken.value}`);
        }

        token.value =
          token.original.value[0] === "{" && token.original.value[token.original.value.length - 1] === "}"
            ? JSON.stringify(token.value).replace(
                referenceToken.value,
                outputReferences ? `var(${refCSSProp})` : referenceToken.value
              )
            : token.value;
      } else if (typeof referenceToken === "object" && referenceToken.attributes?.composite) {
        const cssProps = Object.entries(referenceToken.original.value).map(([propName, propValue]) => {
          const usesReference = dictionary.usesReference(propValue);
          const v = getReferenceValue(propValue as string)[0];
          const customProp = makeCSSProp(propName);
          const scssVar = makeSCSSVar(propName);
          acc[0].push(`${scssVar}: ${typeof v === "string" ? v : v.original.value}`);
          acc[1].push(`${customProp}: ${typeof v === "string" ? v : v.original.value}`);
          return `${paramCase(propName)}: ${usesReference && outputReferences ? `var(${customProp})` : propValue}`;
        });
        acc[2].push(`@mixin ${camelCase(token.name)} { 
          ${cssProps.join("\n")}
        }`);
        acc[3].push(`.${camelCase(token.name)} { 
          ${cssProps.join("\n")}
        }`);
      } else if (typeof referenceToken === "string") {
        const usesReference = dictionary.usesReference(referenceToken);
        const v = getReferenceValue(referenceToken);
        const vo = Array.isArray(v) ? v : [v];

        if (
          usesReference &&
          token.original.value[0] === "{" &&
          token.original.value[token.original.value.length - 1] === "}"
        ) {
          vo.forEach((r) => {
            if (typeof r !== "string") {
              token.value = JSON.stringify(token.value).replace(
                r.value,
                outputReferences ? `var(${makeCSSProp(r.name)})` : r.value
              );
            }
          });
        }
      }
    });

    const customProp = makeCSSProp(token.name);
    const scssVar = makeSCSSVar(token.name);
    const scssIdx = acc[0].findIndex((t) => t.includes(scssVar));
    const cssIdx = acc[1].findIndex((t) => t.includes(customProp));

    if (scssIdx === -1) {
      acc[0].push(`${scssVar}: ${token.value};`);
    }
    if (cssIdx === -1) {
      acc[1].push(`${customProp}: ${token.value};`);
    }

    return acc;
  }, transformTokens);

  //     // if (token.filePath.includes("core")) {
  //     //   const sassToken = { ...token };
  //     //   const path = sassToken.path.filter((p) => !/(core|default|font$)/.test(p));
  //     //   sassToken.name = sassToken.type === "color" ? path.slice(-1).join("-") : path.join("-");
  //     //   sassToken.original.value = sassToken.original.value[0] === "{" ? sassToken.value : sassToken.original.value;
  //     //   acc[0].push(sassProps(sassToken));
  //     // }
  //     // if (/dark|light/.test(token.filePath) && !token.path.includes("component")) {
  //     //   const sassToken = { ...token };
  //     //   const path = sassToken.path.reduce((acc, p) => {
  //     //     if (p === "default") {
  //     //       return acc;
  //     //     }
  //     //     acc.push(p === "color" ? "ui" : p);
  //     //     return acc;
  //     //   }, []);
  //     //   path.push(token.filePath.includes("dark") ? "dark" : "light");
  //     //   sassToken.name = path.join("-");
  //     //   acc[0].push(sassProps(sassToken));
  //     // }

  //     return acc;
  //   }, transformTokens);

  return `${StyleDictionary.formatHelpers.fileHeader({ file })}
${scssTokens.join("\n")}

@mixin calcite-theme-${themeName}() {
${cssTokens.join("\n")}
}

${scssMixins?.join("\n") || ""}
${cssClasses?.join("\n") || ""}
`;
}
