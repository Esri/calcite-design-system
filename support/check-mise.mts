import { exec } from "node:child_process";
import { promisify } from "node:util";

(async function (): Promise<void> {
  const execAsync = promisify(exec);
  const localSetup =
    // see https://docs.npmjs.com/cli/v8/using-npm/scripts#:~:text=Scripts%20are%20run%20from,you%20ran%20npm%20run
    process.env.INIT_CWD !== process.cwd();

  if (localSetup || process.env.CI === "true") {
    return;
  }

  try {
    await execAsync("mise --version", { encoding: "utf8" });
  } catch {
    console.error("Mise is not installed. Please install from https://mise.jdx.dev/");
    process.exit(1);
  }
})();
