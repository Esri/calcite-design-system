const rimraf = require("rimraf");
const { argv } = require("yargs");
const { resolve } = require("path");

// 👇 based on https://stackoverflow.com/a/14032965

process.stdin.resume(); // so the program will not close instantly

interface CleanupOptions {
  cleanup: boolean;
}

interface ExitOptions {
  exit: boolean;
}

const { path } = argv;

const exitHandler = (options: CleanupOptions | ExitOptions): void => {
  if ("cleanup" in options) {
    rimraf.sync(resolve(`${process.cwd()}/${path}`));
  }
  if ("exit" in options) {
    process.exit();
  }
};

// do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

// catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches other kill process signals (e.g., concurrently --kill-others ...)
process.on("SIGHUP", exitHandler.bind(null, { exit: true }));
process.on("SIGTERM", exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

// catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
