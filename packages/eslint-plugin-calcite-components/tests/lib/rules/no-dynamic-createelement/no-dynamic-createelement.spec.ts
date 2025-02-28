import { describe } from "vitest";
import rule from "../../../../src/rules/no-dynamic-createelement";
import * as path from "path";
import * as fs from "fs";
import { ruleTester } from "../../../../src/utils/rule-tester";

describe("no-dynamic-createelement", () => {
  const files = {
    good: path.resolve(__dirname, "no-dynamic-createelement.good.tsx"),
    wrong: path.resolve(__dirname, "no-dynamic-createelement.wrong.tsx"),
  };
  ruleTester().run("no-dynamic-createelement", rule, {
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
        errors: [
          {
            messageId: "default",
          },
        ],
      },
    ],
  });
});
