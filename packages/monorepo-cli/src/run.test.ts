import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("CLI entrypoint", () => {
  it("prints help without loading test modules", () => {
    const cliPath = join(import.meta.dirname, "../../../cli.js");
    const output = execFileSync(process.execPath, [cliPath, "--help"], {
      encoding: "utf8",
      env: { ...process.env, NO_COLOR: "1" },
    });

    expect(output).toContain("Usage: node cli [options]");
    expect(Math.max(...output.split("\n").map((line) => line.length))).toBeLessThanOrEqual(120);
  });
});
