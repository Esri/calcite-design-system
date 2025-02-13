module.exports = {
  "*.{json,html,yml}": ["prettier --write"],
  "*.{s,}css": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write", "markdownlint --fix"],
};
