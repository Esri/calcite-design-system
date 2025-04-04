export default {
  config: {
    $schema:
      "https://raw.githubusercontent.com/DavidAnson/markdownlint-cli2/main/schema/markdownlint-cli2-config-schema.json",
    "first-line-heading": false,
    "no-inline-html": false,
    "line-length": false,
    "code-block-style": { style: "fenced" },
    "code-fence-style": { style: "backtick" },
    "heading-style": { style: "atx" },
    "no-duplicate-heading": { siblings_only: true },
    "emphasis-style": { style: "asterisk" },
    "strong-style": { style: "asterisk" },
    "ul-style": { style: "dash" },
  },
  gitignore: true,
  ignores: ["**/THIRD-PARTY-LICENSES.md"],
};
