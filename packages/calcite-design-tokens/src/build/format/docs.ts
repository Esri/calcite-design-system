import prettierSync from "@prettier/sync";
import { FormatFn } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";
import { cleanAttributes } from "./utils/index.js";

export const formatDocsPlatform: FormatFn = async ({ dictionary }) => {
  console.log(`
  >>> debug info 
    MODE: ${process.env.MODE}
    GITHUB_ACTION: ${process.env.GITHUB_ACTION}
    GITHUB_JOB: ${process.env.GITHUB_JOB}
    GITHUB_WORKFLOW: ${process.env.GITHUB_WORKFLOW}
    RUNNER_NAME: ${process.env.RUNNER_NAME}
  <<<`);

  const timestamp = process.env.MODE === "test" ? "TEST_TIMESTAMP" : Date.now();

  const output = {
    timestamp,
    tokens: dictionary.allTokens.map((token) => {
      token.value = typeof token.value !== "string" ? JSON.stringify(token.value) : token.value;

      delete (token as Partial<Pick<TransformedToken, "original">>).original;
      cleanAttributes(token);

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
