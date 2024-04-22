module.exports = {
  rules: {
    /* Using conditional logic in a confined test helper to handle specific scenarios, reducing duplication, balancing test readability and maintainability. **/
    "jest/no-conditional-expect": "off",
    /* Util functions are now imported to be used as `it` blocks within `describe` instead of assertions within `it` blocks. */
    "jest/no-export": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["tests/commonTests/*"],
            message:
              "Import named functions from commonTests instead of direct module imports, e.g., import { disabled } from 'tests/commonTests'",
          },
        ],
      },
    ],
  },
};
