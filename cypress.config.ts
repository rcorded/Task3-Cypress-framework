import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 8000,
  projectId: "3t4zdu",
  watchForFileChanges: false,
  allowCypressEnv: true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://telnyx.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); 
      return config;
    },
  },
});
