import { describe } from "vitest";
import rule from "../../../../src/rules/ban-events";
import * as path from "path";
import * as fs from "fs";
import { ruleTester } from "../../../../src/utils/rule-tester";

describe("ban-events", () => {
  const files = {
    good: path.resolve(__dirname, "ban-events.good.tsx"),
    wrong: path.resolve(__dirname, "ban-events.wrong.tsx"),
  };

  const options = ["some-unsupported-event", { event: "keypress", message: "use keyup or keydown instead" }];

  ruleTester().run("ban-events", rule, {
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
        errors: [
          {
            messageId: "default",
          },
          {
            messageId: "default",
          },
          {
            messageId: "default",
          },
          {
            messageId: "default",
          },
        ],
      },
    ],
  });
});
