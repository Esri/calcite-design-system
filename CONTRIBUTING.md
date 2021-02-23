# Contributing to calcite-tailwind

You want to contribute? Nice! Below are some guidelines for ensuring that your contribution makes sense for everybody.

## Reporting Issues

Found a problem? Want a new feature?

- See if your issue or idea has [already been reported](issues).
- Provide detailed reproduction instructions as well as what behavior is expected.

## Submitting Pull Requests

Pull requests are the greatest contributions, so be sure they are focused in scope.

1. To begin, [fork this project](fork), clone your fork, and add our upstream.
```bash
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-user>/calcite-tailwind
# Navigate to the newly cloned directory
cd calcite-tailwind
# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/esri/calcite-tailwind
# Install the tools necessary for development
npm install
```

2. Create a branch for your feature or fix:
```bash
# Move into a new branch for a feature
git checkout -b feature/thing
```
```bash
# Move into a new branch for a fix
git checkout -b fix/something
```

3. Start up a local development server:
```bash
# Use the start script to run the default dev environment
npm start
```

4. Be sure your code follows our practices.
```bash
# Test current code
npm run test
```

5. Push your branch up to your fork:
```bash
# Push a feature branch
git push origin feature/thing
```
```bash
# Push a fix branch
git push origin fix/something
```

6. Now [open a pull request](https://help.github.com/articles/using-pull-requests/) with a clear title and description.

## Bumping the Version

1. Change the version number in `package.json` to the desired version number.
2. Write a description of the changes, additions, and bug fixes in `CHANGELOG.md`.
3. Run `npm run dist` to make sure the `dist/` files are updated.
4. Make sure `Esri/calcite-tailwind` is up-to-date with your changes (via Pull Request).
5. Run `npm run release`. If prompted enter your GitHub credentials.

## Updating the documentation

1. `npm run gh-pages` to build the docs and deploy to https://esri.github.io/calcite-tailwind
