import { readFile } from "node:fs/promises";
import postcss from "postcss";
import * as scss from "postcss-scss";
import { globby } from "globby";
import { describe, expect, it } from "vitest";

const deprecatedTokenMappings = {
  "--calcite-color-background": "--calcite-theme-color-surface-1",
  "--calcite-color-foreground-1": "--calcite-theme-color-surface-2",
  "--calcite-color-foreground-2": "--calcite-theme-color-surface-3",
  "--calcite-color-foreground-3": "--calcite-theme-color-surface-4",
  "--calcite-corner-radius-round": "--calcite-theme-corner-radius-sm",
  "--calcite-corner-radius-sharp": "--calcite-theme-corner-radius-none",
  "--calcite-font-weight-normal": "--calcite-theme-font-weight-regular",
} as const;

type DeprecatedToken = keyof typeof deprecatedTokenMappings;

type VarCall = {
  end: number;
  name: string;
  start: number;
};

function findClosingParenthesis(value: string, openParenthesis: number): number {
  let depth = 1;

  for (let index = openParenthesis + 1; index < value.length; index++) {
    if (value[index] === "(") {
      depth++;
    } else if (value[index] === ")" && --depth === 0) {
      return index;
    }
  }

  return -1;
}

function getVarCalls(value: string): VarCall[] {
  const calls: VarCall[] = [];

  for (let start = value.indexOf("var("); start >= 0; start = value.indexOf("var(", start + 1)) {
    const openParenthesis = start + 3;
    const end = findClosingParenthesis(value, openParenthesis);

    if (end < 0) {
      continue;
    }

    const name = value
      .slice(openParenthesis + 1, end)
      .split(",", 1)[0]
      .trim();
    calls.push({ end, name, start });
  }

  return calls;
}

function getImmediateParent(call: VarCall, calls: VarCall[]): VarCall | undefined {
  return calls
    .filter((candidate) => candidate.start < call.start && candidate.end > call.end)
    .sort((first, second) => first.end - first.start - (second.end - second.start))[0];
}

describe("deprecated token migration fallbacks", () => {
  it("places each replacement theme token immediately before its deprecated reference token", async () => {
    const files = await globby(["src/components/**/*.scss", "src/styles/**/*.scss"]);
    const violations: string[] = [];

    await Promise.all(
      files.map(async (file) => {
        const source = await readFile(file, "utf8");
        const root = postcss().process(source, { from: file, syntax: scss }).root;

        root.walkDecls((declaration) => {
          const calls = getVarCalls(declaration.value);

          for (const call of calls) {
            if (!(call.name in deprecatedTokenMappings)) {
              continue;
            }

            const deprecatedToken = call.name as DeprecatedToken;
            const expectedThemeToken = deprecatedTokenMappings[deprecatedToken];
            const parent = getImmediateParent(call, calls);

            if (parent?.name !== expectedThemeToken) {
              const line = declaration.source?.start?.line ?? 0;
              violations.push(`${file}:${line} ${deprecatedToken} must fall back from ${expectedThemeToken}`);
            }
          }
        });
      }),
    );

    expect(violations.toSorted().join("\n")).toBe("");
  });
});
