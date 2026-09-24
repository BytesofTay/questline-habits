import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:5187",
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run start -- --port 5187",
    url: "http://127.0.0.1:5187",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
