import { describe } from "vitest";
import rule from "../../../../src/rules/strict-boolean-attributes";
import good from "./strict-boolean-attributes.good.tsx?raw";
import wrong from "./strict-boolean-attributes.wrong.tsx?raw";
import { ruleTester } from "../../../../src/utils/rule-tester";

describe("strict-boolean-attributes", () => {
  ruleTester().run("strict-boolean-attributes", rule, {
    valid: [
      {
        code: good,
        filename: "strict-boolean-attributes.good.tsx",
      },
    ],

    invalid: [
      {
        code: wrong,
        filename: "strict-boolean-attributes.wrong.tsx",
        errors: [
          {
            messageId: "default",
          },
        ],
      },
    ],
  });
});
