import { Command } from "@commander-js/extra-typings";
import dedent from "dedent";
import { assertRequiredOption, errorAndExit, getSummary } from "./utils/commands.ts";

type ValidateBreakingChangePrOptions = {
  title: string;
  body: string;
};

const description = dedent`
  Validate breaking-change markers in a pull request.

  Require matching title (!) and description (BREAKING CHANGE:) markers,
  with an explanation outside Markdown examples and HTML comments.
`;
const titleUsage = "--title <TITLE>";

export const registerCommand = (command: Command): void =>
  void command
    .command("validate-breaking-change-pr")
    .summary(getSummary(description))
    .description(description)
    .option(titleUsage, "The pull request title. (env: PR_TITLE)")
    .option("--body <BODY>", "The pull request description. Defaults to empty. (env: PR_BODY)")
    .action(run);

function run({ title, body }: Partial<ValidateBreakingChangePrOptions>): void {
  const validatedTitle = assertRequiredOption(title ?? process.env.PR_TITLE, titleUsage);
  const hasBreakingTitle = /^[a-z]+(?:\([^()\r\n]*\))?!:\s+/i.test(validatedTitle);
  const lines = getDescriptionLines(body ?? process.env.PR_BODY ?? "");
  let hasBreakingDeclaration = false;

  for (const [index, line] of lines.entries()) {
    const declaration = /^ {0,3}BREAKING( CHANGE|-CHANGE):[ \t]*(.*)$/.exec(line);
    if (!declaration) {
      continue;
    }

    hasBreakingDeclaration = true;
    if (declaration[1] === "-CHANGE") {
      errorAndExit("Use the canonical `BREAKING CHANGE:` spelling in the PR description, not `BREAKING-CHANGE:`.");
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
      errorAndExit("Add an explanation after `BREAKING CHANGE:` in the PR description.");
    }
  }

  if (hasBreakingTitle && !hasBreakingDeclaration) {
    errorAndExit(
      "The PR title uses `!`. Add `BREAKING CHANGE: <explanation>` to the PR description outside code blocks and HTML comments.",
    );
  } else if (hasBreakingDeclaration && !hasBreakingTitle) {
    errorAndExit(
      "The PR description declares a breaking change. Add `!` immediately before the title's colon, e.g. `feat(component)!: describe the change`.",
    );
  }
}

function getDescriptionLines(body: string): string[] {
  let inComment = false;
  let fence = "";
  let fenceIndent = 0;
  const listIndents: number[] = [];

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
