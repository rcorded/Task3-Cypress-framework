import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 8000,
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
