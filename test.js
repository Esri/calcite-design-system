const conventionalCommitRegex =
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([\w ,-]+\))?(!?:\s+)([\w ]+[\s\S]*)/i;

const pull_request = { title: "blah blah blah" };
const issue = undefined;
const commitMessage = (issue && issue.title) || (pull_request && pull_request.title);

if (!commitMessage) {
  console.log("No title found, ending run.");
  // return;
}
console.log(commitMessage);
const match = commitMessage.match(conventionalCommitRegex);

console.log(match);

if (match && match.length > 1) {
  const labels = [getLabelName(match[1])];
  console.log(labels);
  // await octokit.rest.issues.addLabels({
  //   owner,
  //   repo,
  //   issue_number,
  //   labels
  // });

  function getLabelName(type) {
    switch (type) {
      case "feat":
        return "enhancement";
      case "fix":
        return "bug";
      case "docs":
        return "docs";
      case "test":
        return "testing";
      case "refactor":
        return "refactor";
      case "tooling":
        return "tooling";
      default:
        return "chore";
    }
  }
}
