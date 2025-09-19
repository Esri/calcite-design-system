import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

(async function (): Promise<void> {
  const localSetup =
    // see https://docs.npmjs.com/cli/v8/using-npm/scripts#:~:text=Scripts%20are%20run%20from,you%20ran%20npm%20run
    process.env.INIT_CWD !== process.cwd();

  if (localSetup || process.env.CI === "true") {
    return;
  }

  try {
    await execAsync("volta --version", { encoding: "utf8" });
  } catch {
    console.error("Volta is not installed. Please install from https://volta.sh");
    process.exit(1);
  }
})();
