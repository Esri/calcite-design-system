#!/usr/bin/env node
import { Command } from "@commander-js/extra-typings";
import fs from "node:fs";
import { styleText } from "node:util";

interface CommandModule {
  registerCommand: (program: Command) => void;
}

const program = new Command();

program
  .name("node cli")
  .description(`CLI for managing monorepo tasks. Use node cli <command> --help to see more details about a command.`)
  .configureHelp({
    helpWidth: Math.min(process.stdout.columns ?? 120, 120),
    styleSubcommandText: (text) => styleText("green", text, { stream: process.stdout }),
    formatItem(term, _termWidth, description, helper) {
      const termIndent = 2;
      const descriptionIndent = 6;
      const lines = [`${" ".repeat(termIndent)}${term}`];

      if (description) {
        const descriptionIndentText = " ".repeat(descriptionIndent);
        const wrappedDescription = helper.boxWrap(description, (helper.helpWidth ?? 120) - descriptionIndent);
        lines.push(`${descriptionIndentText}${wrappedDescription.replaceAll("\n", `\n${descriptionIndentText}`)}`);
      }

      lines.push("");
      return lines.join("\n");
    },
  });

const commandsDirectory = import.meta.dirname;

/**
 * If CLI is called with a specific command, only load that command.
 * Otherwise, load all.
 */
const commandName = process.argv[2];
const commandsToLoad =
  commandName !== undefined && commandName !== "help" && !commandName.startsWith("-")
    ? [`${commandName}.ts`]
    : fs.readdirSync(commandsDirectory).filter((file) => !file.endsWith(".test.ts"));

// Load all commands in the ./commands directory
Promise.all(
  commandsToLoad.map(async (file) => {
    if (!file.endsWith(".ts")) {
      return;
    }
    let command: CommandModule;
    try {
      command = (await import(`./${file}`)) as CommandModule;
    } catch (error) {
      const isCommandNotFound =
        error instanceof Error &&
        "code" in error &&
        error.code === "ERR_MODULE_NOT_FOUND" &&
        "url" in error &&
        typeof error.url === "string" &&
        // It is not a command not found error if the error reports for a file
        // that was imported by the command file, rather than the command file itself.
        error.url.endsWith(file);
      /* eslint-disable-next-line no-console -- Required for CLI output. */
      console.error(isCommandNotFound ? `error: unknown command: ${file.slice(0, -".ts".length)}` : error);
      process.exit(1);
    }
    if (typeof command.registerCommand === "function") {
      command.registerCommand(program);
    }
  }),
)
  .then(() => {
    const commands = program.commands as Command[];
    commands.sort((left, right) => left.name().localeCompare(right.name()));
    program.parse();
  })
  .catch((error) => {
    /* eslint-disable-next-line no-console -- Required for CLI output. */
    console.error(error);
    process.exit(1);
  });
