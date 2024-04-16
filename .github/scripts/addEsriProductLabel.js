const { createLabelIfMissing } = require("./support/utils");

module.exports = async ({ github, context }) => {
  const {
    repo: { owner, repo },
    payload: {
      action,
      issue: { body, number: issue_number },
    },
  } = context;

  if (!body) {
    console.log("could not determine the issue body");
    return;
  }

  const productRegex = new RegExp(
    action === "edited"
      ? // the way GitHub parses the issue body into plaintext
        // requires this exact format for edits
        "(?<=### Esri team\r\n\r\n).+"
      : // otherwise it depends on the submitter's OS
        "(?<=### Esri team[\r\n|\r|\n]{2}).+$",
    "m",
  );

  const productRegexMatch = body.match(productRegex);

  const product = (productRegexMatch && productRegexMatch[0] ? productRegexMatch[0] : "").trim();

  if (product && product !== "N/A") {
    await createLabelIfMissing({
      github,
      context,
      label: product,
      color: "006B75",
      description: `Issues logged by ${product} team members.`,
    });

    await github.rest.issues.addLabels({
      issue_number,
      owner,
      repo,
      labels: [product],
    });
  }
};
