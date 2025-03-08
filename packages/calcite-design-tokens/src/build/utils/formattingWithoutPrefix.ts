import { FormatFnArguments } from "style-dictionary/types";

type FormattingOverrides = FormatFnArguments["options"]["formatting"];
/**
 * Utility function from https://github.com/amzn/style-dictionary/blob/85d12e083a8eaf54b13a6a1691c790d1ff8a9151/lib/common/formats.js#L175
 * Remove prefix because the prefix option for createPropertyFormatter
 * is not the same as the prefix inside header comment
 *
 * @param {FormattingOverrides} [formatting]
 * @returns {Omit<FormattingOverrides, "prefix">}
 */
export function getFormattingCloneWithoutPrefix(formatting: FormattingOverrides): Omit<FormattingOverrides, "prefix"> {
  const formattingWithoutPrefix = structuredClone(formatting) ?? {};
  delete formattingWithoutPrefix["prefix"];
  return formattingWithoutPrefix;
}
