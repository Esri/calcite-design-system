import { execFileSync } from "node:child_process";

if (process.env.SKIP_PLAYWRIGHT_INSTALL !== "true") {
  execFileSync("npx", ["playwright", "install", "chromium", "--with-deps", "--no-shell"], {
    stdio: "inherit",
  });
}
