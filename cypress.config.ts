import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "3t4zdu",
  watchForFileChanges: false,
  allowCypressEnv: true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); 
      return config;
    },
  },
});
