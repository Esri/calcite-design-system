import { describe, it, expect } from "vitest";
import stylelint from "stylelint";
import { messages } from "./meta.ts";
import { deprecationFormat } from "./rule.ts";

const ruleName = deprecationFormat.ruleName;

function runStylelint(code: string, config: any) {
  return stylelint.lint({
    code,
    config: {
      plugins: [require.resolve("../../index.ts")],
      rules: { [ruleName]: config },
    },
    codeFilename: "test.css",
  });
}

describe("deprecationFormat rule", () => {
  it("accepts valid deprecation and removal target", async () => {
    const code = "/* @prop --test-example-token: [Deprecated] in v3.3.0, removal target v6.0.0 - Use `--test-alternative-token` instead. */";
    const result = await runStylelint(code, true);
    expect(result.results[0].warnings).toHaveLength(0);
  });

  it("rejects missing both deprecation and removal target", async () => {
    const code = "/* @prop --test-example-token: [Deprecated] - Use `--test-alternative-token` instead. */";
    const result = await runStylelint(code, true);
    expect(result.results[0].warnings).toHaveLength(1);
    expect(result.results[0].warnings[0].text).toBe(messages.rejected);
  });

  it("rejects missing removal target", async () => {
    const code = "/* @prop --test-example-token: [Deprecated] in v3.3.0 - Use `--test-alternative-token` instead. */";
    const result = await runStylelint(code, true);
    expect(result.results[0].warnings).toHaveLength(1);
    expect(result.results[0].warnings[0].text).toBe(messages.rejected);
  });

  it("rejects missing deprecation version", async () => {
    const code = "/* @prop --test-example-token: [Deprecated], removal target v6.0.0 - Use `--test-alternative-token` instead. */";
    const result = await runStylelint(code, true);
    expect(result.results[0].warnings).toHaveLength(1);
    expect(result.results[0].warnings[0].text).toBe(messages.rejected);
  });
});
