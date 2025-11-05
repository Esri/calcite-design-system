import { describe } from "vitest";
import rule from "../../../../src/rules/ban-events";
import good from "./ban-events.good.tsx?raw";
import wrong from "./ban-events.wrong.tsx?raw";
import { ruleTester } from "../../../../src/utils/rule-tester";

describe("ban-events", () => {
  const options = ["some-unsupported-event", { event: "keypress", message: "use keyup or keydown instead" }];

  ruleTester().run("ban-events", rule, {
    valid: [
      {
        code: good,
        options,
        filename: "ban-events.good.tsx",
      },
    ],

    invalid: [
      {
        code: wrong,
        options,
        filename: "ban-events.wrong.tsx",
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
