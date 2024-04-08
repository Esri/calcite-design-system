import rule from "../../../../src/rules/no-dynamic-createelement";
import { ruleTester } from "stencil-eslint-core";
import * as path from "path";
import * as fs from "fs";

const projectPath = path.resolve(__dirname, "../../../tsconfig.json");

describe("no-dynamic-createelement rule", () => {
  const files = {
    good: path.resolve(__dirname, "no-dynamic-createelement.good.tsx"),
    wrong: path.resolve(__dirname, "no-dynamic-createelement.wrong.tsx"),
  };
  ruleTester(projectPath).run("no-dynamic-createelement", rule, {
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
