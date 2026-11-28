import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { compileString } from "sass-embedded";
import { expect, it } from "vitest";

const url = pathToFileURL(`${process.cwd()}/src/components/panel/panel.scss`);
const source = readFileSync(url, "utf8");

it("generates a reset and fallback stack when an owner override is defined", () => {
  const extendedSource = source.replace(
    "@function owner-token",
    '$owner-token-defaults: map.set($owner-token-defaults, "test-override", 7px);\n\n@function owner-token',
  );
  const { css } = compileString(`${extendedSource}\n.probe { padding: owner-token("test-override"); }`, { url });

  expect(css).toContain("--calcite-owner-panel-test-override: initial;");
  expect(css).toContain("padding: var(--calcite-owner-panel-test-override, var(--calcite-panel-test-override, 7px));");
});

it("rejects an owner override without a reset definition", () => {
  expect(() => compileString(`${source}\n.probe { padding: owner-token("undefined-token"); }`, { url })).toThrow(
    "Undefined Panel owner token: undefined-token",
  );
});
