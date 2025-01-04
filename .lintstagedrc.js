module.exports = {
  "*.{cjs,mjs,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{html,json,yml}": ["prettier --write"],
  "*.md": ["prettier --write", "markdownlint --fix"],
  "*.scss": ["stylelint --fix", "prettier --write"],
};
