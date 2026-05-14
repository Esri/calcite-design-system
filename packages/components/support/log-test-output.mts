import { existsSync, readFileSync, statSync} from "node:fs";
import chalk from "chalk";

interface TestLog {
  name: string;
  file: string;
}

const logs: TestLog[] = [
  { name: "Stable", file: "test-stable.err.log" },
  { name: "Experimental", file: "test-experimental.err.log" },
];

let hadError = false;

console.log(chalk.bgMagenta.bold.whiteBright("\n=======Test Summary======="));

for (const { name, file } of logs) {
  if (existsSync(file) && statSync(file).size > 0) {
    hadError = true;
    console.log(chalk.bold.underline.magentaBright(`\n${name} Errors\n`));
    process.stdout.write(readFileSync(file, "utf8"));
    console.log(chalk.bold.gray("\n==================================================================="));
  } else {
    console.log(chalk.green(`\n[${name}] No errors found.`));
  }
}

if (hadError) {
  console.log(chalk.bgRed.whiteBright("\nSome tests failed. See above for details.\n"));
} else {
  console.log(chalk.bgGreen.blackBright("\nAll tests passed!\n"));
}

process.exit(hadError ? 1 : 0);
