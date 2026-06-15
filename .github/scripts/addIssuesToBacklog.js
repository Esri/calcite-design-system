// @ts-check
const {
	labels: { issueType },
	milestones,
} = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
	const { repo, owner } = context.repo;
	const logParams = { title: "Add Issues To Backlog" };

	const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
	const {
		action,
		issue: { labels, milestone, number: issue_number },
	} = payload;

	if (action !== "opened") {
		core.notice(`Issue #${issue_number} action is '${action}', skipping backlog assignment.`, logParams);
		return;
	}

	const hasTestingLabel = labels?.some((label) => label.name === issueType.test);

	if (!hasTestingLabel) {
		core.notice(`Issue #${issue_number} is not labeled '${issueType.test}', skipping backlog assignment.`, logParams);
		return;
	}

	if (milestone) {
		core.notice(`Issue #${issue_number} already has a milestone, skipping backlog assignment.`, logParams);
		return;
	}

	await github.rest.issues.update({
		owner,
		repo,
		issue_number,
		milestone: milestones.backlog.number,
	});

	core.notice(`Assigned issue #${issue_number} to milestone '${milestones.backlog.name}'.`, logParams);
};
