# Monorepo CLI

This package is under `@esri` scope and will never be published to npm or our registry.
It is only intended to be used via `node cli <command>` from the monorepo root, and should not be imported by other packages.

It has only value to this monorepo as a central place to put CLI commands related to development and maintenance of the monorepo itself.

To get the list of available commands, run:

```sh
node cli
```

## Team status

Serve a snapshot of the Calcite team's open issues in the earliest-due open
milestone:

```sh
node cli team-status
```

For local use, install the GitHub CLI and sign in with
`gh auth login --hostname github.com`, then run `node cli team-status`.
Authentication uses `--token <TOKEN>` first, then `GH_TOKEN`, then the local
GitHub CLI login. The token needs read access to repository issues.

The command randomizes the team order on each run, automatically selects an available port, and prints the local URL
without opening a browser. Press Ctrl+C to stop the
server and rerun the command to refresh the snapshot or reshuffle the team.

Use **Copy team status** on the page to copy the totals and team list, including
links, as rich text. Plain text is also included for apps that do not accept HTML.
The page reports clipboard errors if access is denied or unsupported.

Counts exclude pull requests and issues labeled `4 - installed`. Team members
with outstanding issues link to the corresponding GitHub issue search. If no
open milestone has a due date, the page explains this and shows zero counts.
The roster is maintained in `src/team-status.ts`.
