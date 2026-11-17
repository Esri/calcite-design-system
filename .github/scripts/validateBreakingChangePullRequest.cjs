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
  let fenceIndent = 0;
  /** @type {number[]} */
  const listIndents = [];

  return body.split(/\r?\n/).map((line) => {
    const indent = line.search(/[^ ]|$/);
    if (fence && (!line.trim() || indent >= fenceIndent)) {
      const closing = /^ {0,3}(`{3,}|~{3,})[ \t]*$/.exec(line.slice(fenceIndent));
      if (closing && closing[1][0] === fence[0] && closing[1].length >= fence.length) {
        fence = "";
      }
      return "";
    }
    fence = "";

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
        const token = /\\.|(?<!`)(`+)(?!`)(.*?)\1(?!`)|<!--/.exec(line);
        if (!token) {
          visibleLine += line;
          break;
        }
        visibleLine += line.slice(0, token.index);
        line = line.slice(token.index + token[0].length);
        if (token[0] === "<!--") {
          inComment = true;
        } else {
          visibleLine += token[0];
        }
      }
    }

    if (visibleLine.trim()) {
      const visibleIndent = visibleLine.search(/[^ ]|$/);
      while (visibleIndent < (listIndents.at(-1) ?? 0)) {
        listIndents.pop();
      }
    }

    let content = visibleLine.slice(listIndents.at(-1) ?? 0);
    let marker;
    while ((marker = /^ {0,3}(?:[-+*]|\d{1,9}[.)])[ \t]+/.exec(content))) {
      listIndents.push((listIndents.at(-1) ?? 0) + marker[0].length);
      content = content.slice(marker[0].length);
    }

    const opening = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(content);
    if (opening && (opening[1][0] === "~" || !opening[2].includes("`"))) {
      fence = opening[1];
      fenceIndent = listIndents.at(-1) ?? 0;
      return "";
    }
    return visibleLine;
  });
}
