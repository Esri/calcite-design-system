import rule from "../../../../src/rules/require-event-emitter-type";
import { ruleTester } from "stencil-eslint-core";
import * as path from "path";
import * as fs from "fs";

const projectPath = path.resolve(__dirname, "../../../tsconfig.json");

describe("stencil rules", () => {
  const files = {
    good: path.resolve(__dirname, "require-event-emitter-type.good.tsx"),
    wrong: path.resolve(__dirname, "require-event-emitter-type.wrong.tsx"),
  };

  ruleTester(projectPath).run("require-event-emitter-type", rule, {
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
        errors: 2,
      },
    ],
  });
});
