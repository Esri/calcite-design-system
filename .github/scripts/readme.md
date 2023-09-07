# GitHub Scripts

These scripts are called by [our workflows](../workflows) via the [`github-script`](https://github.com/actions/github-script) action, which unfortunately does not support TypeScript. When creating a new workflow that uses `github-script`, make sure to checkout the repo first so the script is accessible.

```yaml
- uses: actions/checkout@v3
- uses: actions/github-script@v6
  with:
    script: |
      const action = require('${{ github.workspace }}/.github/scripts/<SCRIPT NAME HERE>.js')
      await action({github, context, core})
```

The script should export an asynchronous default function:

```js
module.exports = async ({ github, context, core }) => {
  // CODE HERE
};
```

Look at the existing scripts for examples and check the [`octokit.js` documentation](https://octokit.github.io/rest.js/v20) for GitHub API details.
