import rule from "../../../../src/rules/ban-events";
import { ruleTester } from "stencil-eslint-core";
import * as path from "path";
import * as fs from "fs";

const projectPath = path.resolve(__dirname, "../../../tsconfig.json");

describe("stencil rules", () => {
  const files = {
    good: path.resolve(__dirname, "ban-events.good.tsx"),
    wrong: path.resolve(__dirname, "ban-events.wrong.tsx"),
  };

  const options = ["some-unsupported-event", { event: "keypress", message: "use keyup or keydown instead" }];

  ruleTester(projectPath).run("ban-events", rule, {
    valid: [
      {
        code: fs.readFileSync(files.good, "utf8"),
        options,
        filename: files.good,
      },
    ],

    invalid: [
      {
        code: fs.readFileSync(files.wrong, "utf8"),
        options,
        filename: files.wrong,
        errors: 3,
      },
    ],
  });
});
