export default {
  "*.{json,html,yml}": ["prettier --write"],
  "*.{s,}css": ["prettier --write"],
  "*.md": ["prettier --write", "markdownlint-cli2 --fix --config ../../.markdownlint-cli2.jsonc"],
};
