import { execSync } from "node:child_process";

const isHeadless = process.env.HEADLESS !== "false";
const target = isHeadless ? "chromium-headless-shell" : "chromium";

execSync(`npx playwright install ${target}`, { stdio: "inherit" });
