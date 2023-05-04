import chalk from "chalk";

(async function () {
  const childProcess = await import("child_process");
  const branch = childProcess.execSync("git rev-parse --abbrev-ref HEAD");

  if (branch.toString().trim() === "main") {
    process.exit();
  } else {
    const message = chalk.red(
      `Error: ${chalk.white(
        `You may only run ${chalk.green("npm publish")} from the ${chalk.yellow(
          "main"
        )} branch. You are on ${chalk.yellow(branch)}.`
      )}`
    );

    console.error(message);
    process.exit(1);
  }
})();
