import { describe } from "vitest";
import rule from "../../../../src/rules/strict-boolean-attributes";
import * as path from "path";
import * as fs from "fs";
import { ruleTester } from "../../../../src/utils/rule-tester";

describe("strict-boolean-attributes", () => {
  const files = {
    good: path.resolve(__dirname, "strict-boolean-attributes.good.tsx"),
    wrong: path.resolve(__dirname, "strict-boolean-attributes.wrong.tsx"),
  };
  ruleTester().run("strict-boolean-attributes", rule, {
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
