module.exports = {
  "*.{json,html,yml}": ["prettier --write"],
  "*.scss": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write", "markdownlint --fix"],
};
