import { messages, name } from "./meta.ts";

/* Test for presence of deprecation and removal target versions in design token `@prop` comments that contain "[Deprecated]" messages. */
// @ts-expect-error
testRule({
  ruleName: name,
  config: true,
  fix: false,
  accept: [
    {
      code: "/* @prop --test-example-token: [Deprecated] in v3.3.0, removal target v6.0.0 - Use `--test-alternative-token` instead. */",
      description:
        'Contains both deprecation and removal target versions on [Deprecated] token (e.g. "@deprecated in v1.2.3, removal target v3").',
    },
  ],
  reject: [
    {
      code: "/* @prop --test-example-token: [Deprecated] in v3.3.0 - Use `--test-alternative-token` instead. */",
      description: "Missing removal target version on [Deprecated] token.",
      message: messages.rejected,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 99,
    },
    {
      code: "/* @prop --test-example-token: [Deprecated], removal target v6.0.0 - Use `--test-alternative-token` instead. */",
      description: "Missing deprecation version on [Deprecated] token.",
      message: messages.rejected,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 112,
    },
  ],
});
