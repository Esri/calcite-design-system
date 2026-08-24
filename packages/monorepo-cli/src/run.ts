#!/usr/bin/env node
import { Command } from "@commander-js/extra-typings";
import fs from "node:fs";

interface CommandModule {
  registerCommand: (program: Command) => void;
}

const program = new Command();

program
  .name("node cli")
  .description(`CLI for managing monorepo tasks. Use node cli <command> --help to see more details about a command.`);

const commandsDirectory = import.meta.dirname;

/**
 * If CLI is called with a specific command, only load that command.
 * Otherwise, load all.
 */
const commandName = process.argv[2];
const commandsToLoad =
  commandName !== undefined && commandName !== "help" && !commandName.startsWith("-")
    ? [`${commandName}.ts`]
    : fs.readdirSync(commandsDirectory);

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
