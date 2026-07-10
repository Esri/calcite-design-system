import { spawn } from "node:child_process";
import { testTimeZones } from "../src/components/input-time-zone/time-zone-fixtures.ts";

const [mode, ...testArgs] = process.argv.slice(2);

if (mode !== "run" && mode !== "watch") {
  console.error(`Expected mode to be "run" or "watch", received "${mode ?? ""}".`);
  process.exit(1);
}

const vitestArgs = [mode, "--config", "vite.time-zone.config.ts", ...testArgs];
const childProcesses = testTimeZones.map(({ name }) => {
  console.log(`[time-zone:${name}] vitest ${vitestArgs.join(" ")}`);

  return spawn("vitest", vitestArgs, {
    env: {
      ...process.env,
      BROWSER_TIME_ZONE: name,
    },
    stdio: "inherit",
  });
});

let exitCode = 0;
let completedCount = 0;

function stopChildProcesses() {
  childProcesses.forEach((childProcess) => {
    if (!childProcess.killed) {
      childProcess.kill("SIGTERM");
    }
  });
}

process.on("SIGINT", () => {
  stopChildProcesses();
  process.exit(130);
});

process.on("SIGTERM", () => {
  stopChildProcesses();
  process.exit(143);
});

childProcesses.forEach((childProcess) => {
  childProcess.on("exit", (code, signal) => {
    completedCount++;

    if (code) {
      exitCode = code;
    } else if (signal && exitCode === 0) {
      exitCode = 1;
    }

    if (completedCount === childProcesses.length) {
      process.exit(exitCode);
    }
  });
});
