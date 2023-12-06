module.exports = {
  "defaultSeverity": "warning",
  "extends": "stylelint-config-recommended-scss",
  "plugins": ["stylelint-use-logical-spec"],
  "rules": {
    "liberty/use-logical-spec": "always",
    "no-descending-specificity": [
      true,
      {
        "ignore": ["selectors-within-list"]
      }
    ],
    "selector-disallowed-list": [
      ["/:host-context/", "/:host\\s*(?=\\.\\S+|\\s*\\{)/"],
      {
        "message": (selector) => {
          if (selector === ":host-context") {
            return ":host-context is not supported in all browsers, so it should be avoided";
          }

          console.log(selector, "CAUGHT");

          // if (selector === ":host") {
            return "standalone `:host` use in shadow DOM is redundant. Please remove it."
          // }
        },
        "severity": "error"
      },
    ],
    "selector-max-specificity": [
      "0,5,5",
      {
        "message": "selector is too complex, consider applying multiple classes dynamically during rendering"
      }
    ],
    "selector-type-no-unknown": [
      true,
      {
        "ignoreTypes": ["/^calcite-/"]
      }
    ]
  }
}
