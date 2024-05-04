import rule from "../../../../src/rules/require-version-prop";
import { ruleTester } from "stencil-eslint-core";
import * as path from "path";
import * as fs from "fs";

const projectPath = path.resolve(__dirname, "../../../tsconfig.json");

describe("stencil rules", () => {
  const files = {
    good: path.resolve(__dirname, "require-version-prop.good.tsx"),
    output: path.resolve(__dirname, "require-version-prop.output.tsx"),
    wrong: path.resolve(__dirname, "require-version-prop.no-prop.wrong.tsx"),
    wrong2: path.resolve(__dirname, "require-version-prop.no-value.wrong.tsx"),
    wrong3: path.resolve(__dirname, "require-version-prop.non-empty-decorator.wrong.tsx"),
  };

  ruleTester(projectPath).run("require-version-prop", rule, {
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
      {
        code: fs.readFileSync(files.wrong2, "utf8"),
        filename: files.wrong2,
        errors: 1,
        output: fs.readFileSync(files.output, "utf8"),
      },
      {
        code: fs.readFileSync(files.wrong3, "utf8"),
        filename: files.wrong2,
        errors: 1,
        output: fs.readFileSync(files.output, "utf8"),
      },
    ],
  });
});
