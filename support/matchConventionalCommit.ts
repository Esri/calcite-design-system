const childProcess = require("child_process");
const pify = require("pify");

const exec = pify(childProcess.exec);

(async function runner(): Promise<void> {
  const conventionalCommitRegex =
    /^((build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([\w ,-]+\))?(!)?: [\w ])+([\s\S]*)/;

  const currentBranch = (await exec(`git rev-parse --abbrev-ref HEAD`, { encoding: "utf-8" })).trim();

  const commits = (await exec(`git log --format=%B ${currentBranch} --not master | tr '\n' ';'`, { encoding: "utf-8" }))
    .trim()
    .split(";")
    .filter((commit: string) => !!commit);

  process.exitCode = commits.length === 1 ? (commits[0].match(conventionalCommitRegex) ? 0 : 1) : 0;
  if (process.exitCode === 1) {
    console.log(
      "Error: please make a conventional commit\nhttps://github.com/Esri/calcite-components/blob/master/CONTRIBUTING.md#commit-message-format\n"
    );
  }
})();
