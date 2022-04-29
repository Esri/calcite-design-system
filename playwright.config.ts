import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: "*.pw.e2e.ts",
  use: {
    baseURL: "http://localhost:3333"
  },
  webServer: {
    command: "serve -p 3333",
    port: 3333,
    reuseExistingServer: !process.env.CI
  }
};

export default config;
