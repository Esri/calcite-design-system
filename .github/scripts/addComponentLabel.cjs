// @ts-check
const { createLabelIfMissing } = require("./support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { repo, owner } = context.repo;
  const logParams = { title: "Add Component Label" };

  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
  const {
    issue: { body, number: issue_number },
  } = payload;

  if (!body) {
    core.notice("Could not determine the issue body", logParams);
    return;
  }

  const OPTION_NA = "N/A";
  const OPTION_UNKNOWN = "Unknown / Not Sure";
  const whichComponentRegex = /### Which Component(?:\r|\n)+(.+)$/m;
  const whichComponentRegexMatch = body.match(whichComponentRegex);
  const componentsString = (whichComponentRegexMatch?.[1] || "").trim();

  if (componentsString === "") {
    core.notice(`No components listed on issue #${issue_number}`, logParams);
  } else {
    // Filter out "N/A" and "Unknown / Not Sure" so we don't create labels for those.
    const filteredComponents = componentsString
      .split(",")
      .map((component) => component.trim())
      .filter((component) => {
        return (
          component !== OPTION_NA && component !== OPTION_UNKNOWN && component !== `${OPTION_NA}, ${OPTION_UNKNOWN}`
        );
      });

    if (filteredComponents.length > 0) {
      const componentsList = filteredComponents.map((component) => `c-${component.replace(/\s+/g, "-").toLowerCase()}`);
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
    } else {
      core.notice(`No valid components to label on issue #${issue_number}`, logParams);
    }
  }
};
