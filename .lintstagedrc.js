module.exports = {
  "*.{json,html,yml}": ["prettier --write"],
  "*.{s,}css": ["prettier --write"],
  "*.md": ["prettier --write", "markdownlint --fix"],
};
