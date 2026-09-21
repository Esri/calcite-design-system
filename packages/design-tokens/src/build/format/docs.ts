import prettierSync from "@prettier/sync";
import type { FormatFn, TransformedToken } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types.ts";
import { cleanAttributes } from "./utils/index.ts";
import { isThemeableToken } from "../utils/token-types.ts";

function themeCssName(token: TransformedToken): string | undefined {
  const names = (token.attributes as { names?: { css?: string } } | undefined)?.names;

  return names?.css?.replace("--calcite-", "--calcite-theme-");
}

export const formatDocsPlatform: FormatFn = async ({ dictionary }) => {
  const output = {
    timestamp: Date.now(),
    tokens: dictionary.allTokens.map((token) => {
      const docsToken = structuredClone(token);
      const theme = isThemeableToken(docsToken) ? { css: themeCssName(docsToken) } : undefined;

      docsToken.$value = typeof docsToken.$value !== "string" ? JSON.stringify(docsToken.$value) : docsToken.$value;

      delete (docsToken as Partial<Pick<TransformedToken, "original">>).original;
      cleanAttributes(docsToken);

      return { ...docsToken, ...(theme ? { theme } : {}) };
    }),
  };

  return prettierSync.format(JSON.stringify(output, null, 2), { parser: "json" });
};

export const registerFormatDocs: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatCalciteDocs,
    format: formatDocsPlatform,
  });
};

export const FormatCalciteDocs = "calcite/format/docs";
