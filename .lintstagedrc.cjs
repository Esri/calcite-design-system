module.exports = {
  "*.{json,html,yml}": [
    "prettier --write"
  ],
  "*.scss": [
    "stylelint --fix",
    "prettier --write"
  ],
  "packages/**/*.{ts,tsx}": [
    // prevents an error due to tsconfig.json not being in the root directory
    // https://github.com/okonet/lint-staged/issues/825#issuecomment-620018284
    () => "eslint --ext .ts,.tsx --fix",
    "prettier --write"
  ],
  "*.md": [
    "markdownlint --fix --disable MD024 MD013 MD041 MD033",
    "prettier --write"
  ]
};
