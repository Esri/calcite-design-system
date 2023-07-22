import rule from "../../../../src/rules/strict-boolean-attributes";
import { ruleTester } from "stencil-eslint-core";
import * as path from "path";
import * as fs from "fs";

const projectPath = path.resolve(__dirname, "../../../tsconfig.json");

describe("stencil rules", () => {
  const files = {
    good: path.resolve(__dirname, "strict-boolean-attributes.good.tsx"),
    wrong: path.resolve(__dirname, "strict-boolean-attributes.wrong.tsx"),
  };
  ruleTester(projectPath).run("strict-boolean-attributes", rule, {
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
      },
    ],
  });
});
