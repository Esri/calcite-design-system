import rule from "../../../../src/rules/enforce-ref-last-prop";
import { ruleTester } from "stencil-eslint-core";
import * as path from "path";
import * as fs from "fs";

const projectPath = path.resolve(__dirname, "../../../tsconfig.json");

describe("enforce-ref-last-prop rule", () => {
  const files = {
    good: path.resolve(__dirname, "enforce-ref-last-prop.good.tsx"),
    wrong: path.resolve(__dirname, "enforce-ref-last-prop.wrong.tsx"),
    output: path.resolve(__dirname, "enforce-ref-last-prop.output.tsx"),
  };
  ruleTester(projectPath).run("enforce-ref-last-prop", rule, {
    valid: [
      {
        code: fs.readFileSync(files.good, "utf8"),
        filename: files.good,
      },
    ],

    invalid: [
      {
        code: fs.readFileSync(files.wrong, "utf8"),
        filename: files.wrong,
        errors: 1,
        output: fs.readFileSync(files.output, "utf8"),
      },
    ],
  });
});
