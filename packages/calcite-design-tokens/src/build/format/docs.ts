import prettierSync from "@prettier/sync";
import { FormatFn } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";

export const formatDocsPlatform: FormatFn = async ({ dictionary }) => {
  const output = {
    timestamp: Date.now(),
    tokens: dictionary.allTokens.map((token) => {
      token.value = typeof token.value !== "string" ? JSON.stringify(token.value) : token.value;

      delete (token as Partial<Pick<TransformedToken, "original">>).original;

      // removal of these fields are to get output as similar as possible to production
      // it can be removed afterward

      if (token.attributes) {
        if (token.attributes.original) {
          delete token.attributes.original;
        }

        if (token.attributes.attributes) {
          delete token.attributes.attributes;
        }

        if (token.attributes.$extensions) {
          delete token.attributes.$extensions;
        }
      }

      if (token.$extensions) {
        delete token.$extensions;
      }

      return token;
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
