import { format as prettierFormat } from "prettier";
import type { FormatFn, TransformedToken } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types.ts";
import { cleanAttributes } from "./utils/index.ts";
import { isThemeableToken } from "../utils/token-types.ts";

function themeNames(token: TransformedToken): { css: string; scss: string; es6: string } | undefined {
  const names = (token.attributes as { names?: { css?: string; scss?: string; es6?: string } } | undefined)?.names;

  if (!names?.css || !names.scss || !names.es6) {
    return undefined;
  }

  return {
    css: names.css.replace("--calcite-", "--calcite-theme-"),
    scss: names.scss.replace("$calcite-", "$calcite-theme-"),
    es6: names.es6.replace("calcite", "calciteTheme"),
  };
}

export const formatDocsPlatform: FormatFn = async ({ dictionary }) => {
  const output = {
    timestamp: Date.now(),
    tokens: dictionary.allTokens.map((token) => {
      const docsToken = structuredClone(token);
      const theme = isThemeableToken(docsToken) ? themeNames(docsToken) : undefined;

      docsToken.$value = typeof docsToken.$value !== "string" ? JSON.stringify(docsToken.$value) : docsToken.$value;

      delete (docsToken as Partial<Pick<TransformedToken, "original">>).original;
      cleanAttributes(docsToken);

      return { ...docsToken, ...(theme ? { theme } : {}) };
    }),
  };

  return prettierFormat(JSON.stringify(output, null, 2), { parser: "json" });
};

export const registerFormatDocs: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatCalciteDocs,
    format: formatDocsPlatform,
  });
};

export const FormatCalciteDocs = "calcite/format/docs";
