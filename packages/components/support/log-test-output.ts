import { existsSync, readFileSync, statSync } from "node:fs";
import { styleText } from "node:util";

interface TestLog {
  name: string;
  file: string;
}

const logs: TestLog[] = [
  { name: "Node", file: "test-node.err.log" },
  { name: "Browser", file: "test-browser.err.log" },
  { name: "Time zone", file: "test-time-zone.err.log" },
];

let hadError = false;

// eslint-disable-next-line no-console -- script logging
console.log(styleText(["bgMagenta", "bold", "whiteBright"], "\n=======Test Summary======="));

for (const { name, file } of logs) {
  if (existsSync(file) && statSync(file).size > 0) {
    hadError = true;
    // eslint-disable-next-line no-console -- script logging
    console.log(styleText(["bold", "underline", "magentaBright"], `\n${name} Errors\n`));
    process.stdout.write(readFileSync(file, "utf8"));
    // eslint-disable-next-line no-console -- script logging
    console.log(styleText(["bold", "gray"], "\n==================================================================="));
  } else {
    // eslint-disable-next-line no-console -- script logging
    console.log(styleText("green", `\n[${name}] No errors found.`));
  }
}

if (hadError) {
  // eslint-disable-next-line no-console -- script logging
  console.log(styleText(["bgRed", "whiteBright"], "\nSome tests failed. See above for details.\n"));
} else {
  // eslint-disable-next-line no-console -- script logging
  console.log(styleText(["bgGreen", "blackBright"], "\nAll tests passed!\n"));
}

process.exit(hadError ? 1 : 0);
