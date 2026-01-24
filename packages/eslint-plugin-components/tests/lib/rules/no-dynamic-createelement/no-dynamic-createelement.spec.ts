import { describe } from "vitest";
import rule from "../../../../src/rules/no-dynamic-createelement";
import good from "./no-dynamic-createelement.good.tsx?raw";
import wrong from "./no-dynamic-createelement.wrong.tsx?raw";
import { ruleTester } from "../../../../src/utils/rule-tester";

describe("no-dynamic-createelement", () => {
  ruleTester().run("no-dynamic-createelement", rule, {
    valid: [
      {
        code: good,
        filename: "no-dynamic-createelement.good.tsx",
      },
    ],

    invalid: [
      {
        code: wrong,
        filename: "no-dynamic-createelement.wrong.tsx",
        errors: [
          {
            messageId: "default",
          },
        ],
      },
    ],
  });
});
