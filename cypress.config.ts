import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: "cypress/support/e2e.ts",
    async setupNodeEvents(on, config) {
      const codeCoverageTask = await import("@cypress/code-coverage/task");
      codeCoverageTask.default(on, config);
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
  },
});
