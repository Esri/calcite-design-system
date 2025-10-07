// @ts-check
const { createLabelIfMissing } = require("./support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
  const {
    issue: { body, number: issue_number },
  } = payload;

  if (!body) {
    console.log("could not determine the issue body");
    return;
  }

  const whichComponentRegex = /### Which Component(?:\r\n|\r|\n){1,2}([^\r\n]+)/m;
  const whichComponentRegexMatch = body.match(whichComponentRegex);

  // If issue includes "Which Component" line then add or create labels, otherwise log message.
  if (whichComponentRegexMatch) {
    const componentsString = (whichComponentRegexMatch[1] || "").trim();

    if (componentsString !== "N/A") {
      const componentsList = componentsString
        .split(", ")
        .map((component) => `c-${component}`.replace(" ", "-").toLowerCase());
      for (const component of componentsList) {
        await createLabelIfMissing({
          github,
          context,
          label: component,
          color: "1d76db",
          description: `Issues that pertain to the calcite-${component.substring(2)} component`,
        });

        await github.rest.issues.addLabels({
          issue_number,
          owner,
          repo,
          labels: [component],
        });
      }
    }
  } else {
    console.log(`No components listed on issue #${issue_number}`);
  }
};
