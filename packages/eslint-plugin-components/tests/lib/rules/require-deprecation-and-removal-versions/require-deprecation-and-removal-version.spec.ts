import { describe } from "vitest";
import rule from "../../../../src/rules/require-deprecation-and-removal-versions";
import good from "./require-deprecation-and-removal-version.good.tsx?raw";
import wrongMissingDeprecation from "./require-deprecation-version.wrong.tsx?raw";
import wrongMissingRemoval from "./require-removal-version.wrong.tsx?raw";
import wrongMissingBoth from "./require-deprecation-and-removal-version.wrong.tsx?raw";
import { ruleTester } from "../../../../src/utils/rule-tester";

describe("require-deprecation-and-removal-version", () => {
  ruleTester().run("require-deprecation-and-removal-version", rule, {
    valid: [
      {
        code: good,
        filename: "require-deprecation-and-removal-version.good.tsx",
      },
    ],
    invalid: [
      {
        code: wrongMissingDeprecation,
        filename: "require-deprecation-version.wrong.tsx",
        errors: [
          {
            messageId: "missingDeprecation",
          },
        ],
      },
      {
        code: wrongMissingRemoval,
        filename: "require-removal-version.wrong.tsx",
        errors: [
          {
            messageId: "missingRemoval",
          },
        ],
      },
      {
        code: wrongMissingBoth,
        filename: "require-deprecation-and-removal-version.wrong.tsx",
        errors: [
          {
            messageId: "missingBoth",
          },
        ],
      },
    ],
  });
});
