// @ts-check

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context, core }) => {
  const payload = /** @type {import('@octokit/webhooks-types').PullRequestEvent} */ (context.payload);
  const { title, body } = payload.pull_request;
  const hasBreakingTitle = /^[a-z]+(?:\([^()\r\n]*\))?!:\s+/i.test(title);
  const lines = getDescriptionLines(body ?? "");
  let hasBreakingDeclaration = false;

  for (const [index, line] of lines.entries()) {
    const declaration = /^ {0,3}BREAKING( CHANGE|-CHANGE):[ \t]*(.*)$/.exec(line);
    if (!declaration) {
      continue;
    }

    hasBreakingDeclaration = true;
    if (declaration[1] === "-CHANGE") {
      core.setFailed("Use the canonical `BREAKING CHANGE:` spelling in the PR description, not `BREAKING-CHANGE:`.");
      return;
    }

    const explanation = declaration[2].trim();
    const continuation = lines[index + 1] ?? "";
    if (
      !explanation &&
      (!continuation.trim() ||
        /^ {0,3}(?:[\w-]+|BREAKING CHANGE)(?::[ \t]|[ \t]+#)/.test(continuation) ||
        /^ {0,3}[>#]/.test(continuation) ||
        /^ {4}/.test(continuation))
    ) {
      core.setFailed("Add an explanation after `BREAKING CHANGE:` in the PR description.");
      return;
    }
  }

  if (hasBreakingTitle && !hasBreakingDeclaration) {
    core.setFailed(
      "The PR title uses `!`. Add `BREAKING CHANGE: <explanation>` to the PR description outside code blocks and HTML comments.",
    );
  } else if (hasBreakingDeclaration && !hasBreakingTitle) {
    core.setFailed(
      "The PR description declares a breaking change. Add `!` immediately before the title's colon, e.g. `feat(component)!: describe the change`.",
    );
  }
};

/** @param {string} body */
function getDescriptionLines(body) {
  let inComment = false;
  let fence = "";

  return body.split(/\r?\n/).map((line) => {
    if (fence) {
      const closing = /^ {0,3}(`{3,}|~{3,})[ \t]*$/.exec(line);
      if (closing && closing[1][0] === fence[0] && closing[1].length >= fence.length) {
        fence = "";
      }
      return "";
    }

    let visibleLine = "";
    while (line) {
      if (inComment) {
        const end = line.indexOf("-->");
        if (end === -1) {
          break;
        }
        inComment = false;
        line = line.slice(end + 3);
      } else {
        const start = line.indexOf("<!--");
        if (start === -1) {
          visibleLine += line;
          break;
        }
        visibleLine += line.slice(0, start);
        line = line.slice(start + 4);
        inComment = true;
      }
    }

    const opening = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(visibleLine);
    if (opening && (opening[1][0] === "~" || !opening[2].includes("`"))) {
      fence = opening[1];
      return "";
    }
    return visibleLine;
  });
}
